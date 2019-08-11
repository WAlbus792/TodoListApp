using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using AutoMapper.Attributes;
using Gevorgyan.TodoListApp.Application;
using Gevorgyan.TodoListApp.Application.Commands.Users;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Domain.Helpers;
using Gevorgyan.TodoListApp.Persistence;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Gevorgyan.TodoListApp.RestApi.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace Gevorgyan.TodoListApp.RestApi
{
    public class Startup
    {
        #region Constructor

        public Startup(IConfiguration configuration) => Configuration = configuration;

        #endregion

        #region Properties

        public IConfiguration Configuration { get; }

        /// <summary>
        /// Container of the services (Autofac) 
        /// </summary>
        public IContainer ApplicationContainer { get; private set; }

        #endregion

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                options.Filters.Add(new GlobalExceptionFilter());
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true, // will be validated the issuer on token validation
                    ValidIssuer = AuthOptions.Issuer,

                    ValidateAudience = true, // will be validated the audience on token validation
                    ValidAudience = AuthOptions.Audience,

                    ValidateLifetime = false,  // will be validated the lifetime of token 

                    IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(), // setting the key of security
                    ValidateIssuerSigningKey = true // will be validated the key of security
                };
            });

            // EF (for DB connection)
            string connectionString = Configuration.GetConnectionString("Default");
            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

            #region Dependency Injection using Autofac

            ContainerBuilder containerBuilder = new ContainerBuilder();

            #region Application components

            containerBuilder
                .RegisterAssemblyTypes(Assembly.GetAssembly(typeof(AccessRightChecker)))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
            containerBuilder
                .RegisterAssemblyTypes(Assembly.GetAssembly(typeof(AccessRightChecker)))
                .InstancePerLifetimeScope();

            // UserInfoProvider
            containerBuilder
                .RegisterType<UserInfoProvider>()
                .As<IUserInfoProvider>()
                .As<IUserInfoSetter>()
                .InstancePerLifetimeScope();

            #endregion

            #region Persistence components

            containerBuilder
              .RegisterGeneric(typeof(Repository<>))
              .As(typeof(IRepository<>))
              .InstancePerLifetimeScope();

            containerBuilder
                .RegisterType<DbChangesUpdater<AppDbContext>>()
                .As<IDbChangesUpdater>()
                .InstancePerLifetimeScope();

            #endregion

            containerBuilder.Populate(services);
            ApplicationContainer = containerBuilder.Build();

            #endregion

            return new AutofacServiceProvider(ApplicationContainer);
        }

        public void Configure(IApplicationBuilder app, IApplicationLifetime appLifetime, IHostingEnvironment env)
        {
            using (AppDbContext dbContext = app.ApplicationServices.GetService<AppDbContext>())
                dbContext.Database.Migrate();

            // Enable JWT authentication
            app.UseAuthentication();

            // Sets the information in UserInfoProvider
            app.Use((context, next) =>
            {
                IUserInfoSetter userInfoProvider = context.RequestServices.GetService<IUserInfoSetter>();

                string userName = context.User.Identity.Name;
                if (userName != null)
                {
                    userInfoProvider.UserName = userName;
                    userInfoProvider.UserType = UserType.Authenticated;
                    if (context.User.IsInRole(UserRole.Admin.ToString()))
                        userInfoProvider.UserRole = UserRole.Admin;
                    if (context.User.IsInRole(UserRole.User.ToString()))
                        userInfoProvider.UserRole = UserRole.User;
                    userInfoProvider.UserTokenId = Guid.Parse(context.User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.Sid)?.Value);
                }
                else
                    userInfoProvider.UserType = UserType.Anonymous;

                return next();
            });

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc();

            // Using Spa (Angular source)
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                    spa.UseProxyToSpaDevelopmentServer(Configuration["App:ClientAppURL"]);
            });

            // Automapper (for mapping models)
            Mapper.Initialize(config =>
            {
                config.ShouldMapProperty = p => p.GetMethod.IsPublic || p.GetMethod.IsAssembly;
                typeof(AccessRightChecker).Assembly.MapTypes(config);
                typeof(Startup).Assembly.MapTypes(config);
            });

            // Creates a default admin on starting the application
            using (ILifetimeScope lifetimeScope = ApplicationContainer.BeginLifetimeScope())
            {
                // Current user is System
                IUserInfoSetter userInfoSetter = lifetimeScope.Resolve<IUserInfoSetter>();
                userInfoSetter.UserType = UserType.System;

                CreateDefaultAdminCommand createDefaultAdminCommand = lifetimeScope.Resolve<CreateDefaultAdminCommand>();
                createDefaultAdminCommand.Execute().Wait();
            }

            // Disposes the container of Autofac on stopping the application
            appLifetime.ApplicationStopped.Register(() => ApplicationContainer.Dispose());
        }
    }
}
