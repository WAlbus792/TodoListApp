${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;

    Template(Settings settings)
    {
        settings.IncludeProject("Gevorgyan.TodoListApp.Application");
        settings.OutputExtension = ".ts";
    }

    string Imports(Class c)
    {
        string importItems = string.Empty;
        if(BaseExists(c))
          importItems = $"import {{ { c.BaseClass.Name }, I{c.BaseClass.Name} }} from './{c.BaseClass.Name}';";

        string modelsItems = string.Join(Environment.NewLine, 
            c.Properties.Where(p => IsPropertyTypeGeneratable(p) && p.Type.ClassName().EndsWith("Model") && p.Type.ClassName() != c.Name)
                        .Select(p => $"import {{ {p.Type.ClassName()} }} from './{p.Type.ClassName()}';")
                        .Distinct());

        var dictionariesImports = string.Join(Environment.NewLine, 
            c.Properties.Where(p => p.Type.IsEnum && p.Type.FullName.Contains("Domain"))
                        .Select(p => $"import {{ {p.Type.ClassName()} }} from '../dictionaries/{p.Type.ClassName()}';")
                        .Distinct());

        if(BaseExists(c) && (!string.IsNullOrEmpty(modelsItems) || !string.IsNullOrEmpty(dictionariesImports)))
          importItems = $"{importItems}{Environment.NewLine}";

        if(!string.IsNullOrEmpty(modelsItems))
          importItems = $"{importItems}{Environment.NewLine}{modelsItems}";

        if(!string.IsNullOrEmpty(dictionariesImports))
          importItems = $"{importItems}{Environment.NewLine}{dictionariesImports}";

        return importItems;
    }

    bool IsEnumType(Property property) => property.Type.IsEnum && !property.Type.FullName.Contains("Domain");

    private string WriteComment(string docComment, string whiteSpaces){
        return "/*" + Environment.NewLine + 
               $"{whiteSpaces}* {docComment}" + Environment.NewLine +
               $"{whiteSpaces}*/";
    }

    string PropertyXmlComment(Property property) => WriteComment(property.DocComment, "     ");
    string ClassXmlComment(Class c) => WriteComment(c.DocComment, " ");

    bool IsClassGeneratable(Class c) => !c.Attributes.Any(attr => attr.Name == "NotGeneratable");    

    bool IsPropertyTypeGeneratable(Property p) => !p.Type.Attributes.Any(attr => attr.Name == "NotGeneratable");    

    bool BaseExists(Class c) => c.BaseClass != null && IsClassGeneratable(c.BaseClass);
}


// for AUTO-GENERATION!
$Classes(c => IsClassGeneratable(c) && c.Name.EndsWith("Model"))[
$Imports

$ClassXmlComment
export interface I$Name$TypeParameters$BaseExists[ extends I$BaseClass] {
    $Properties(p => IsPropertyTypeGeneratable(p))[
    $PropertyXmlComment
    $IsEnumType[$name:number;][$name: $Type;]
]}
    
$ClassXmlComment
export class $Name$TypeParameters$BaseExists[ extends $BaseClass] implements I$Name$TypeParameters {
    $Properties(p => IsPropertyTypeGeneratable(p))[
    $PropertyXmlComment
    $IsEnumType[$name:number;][$name: $Type;]
    ]
    constructor(data?: I$Name$TypeParameters) {
        $BaseExists[super();]
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            $Properties(p => IsPropertyTypeGeneratable(p))[
            this.$name = data["$name"];] $BaseExists[$BaseClass[
            $Properties()[
            this.$name = data["$name"];]]]
        }
    }

    static fromJS$TypeParameters (data: any): $Name$TypeParameters {
        data = typeof data === 'object' ? data : {};
        let result = new $Name$TypeParameters();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        $Properties(p => IsPropertyTypeGeneratable(p))[
        data["$name"] = this.$name;]
        $BaseExists[$BaseClass[$Properties()[
        data["$name"] = this.$name;]
        ]]
        return data; 
    }
}    
]