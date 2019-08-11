${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;

    Template(Settings settings)
    {
       settings.IncludeProject("Gevorgyan.TodoListApp.Domain");
       settings.OutputExtension = ".ts";
    }

    string InterfaceName(Enum e) => 'I'+e.Name+"Model";

    string MethodsName(Enum e) => e.Name+"DictionariesMethods";

    string AllModels(Enum e) => "All"+e.Name+"Models";

    string GetEnumByKeyMethodName(Enum e) => "Get" + e.Name + "ModelByKey";
}


// for AUTO-GENERATION!
$Enums(*)[

export enum $Name {$Values[
    $Name = $Value][,]
}

export interface $InterfaceName {
	key: number;
	enumName: string;
	name: string;
}

export class $MethodsName {
    static readonly $AllModels: $InterfaceName [] = [$Values[
        { key: $Value, enumName: '$Name', name: '$DocComment' }][,]
    ];

    static $GetEnumByKeyMethodName(key: number): $InterfaceName { 
	    var find = this.$AllModels.filter(x => x.key == key);
	    if (find.length > 0)
	        return find[0];
	    return null;
    }
}]