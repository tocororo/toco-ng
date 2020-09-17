import { RDFS, OWL, SKOS, SKOSXL, OntoLex, EDOAL } from './Vocabulary';
import { PrefixMapping } from './Metadata';
import { VersionInfo } from './History';
import { ProjectUserBinding } from './User';
import { ProjectPreferences, ProjectSettings } from './Properties';
import { CustomFormValue } from './ARTResources';

export abstract class ARTNode {

    protected tripleGraphs: ARTURIResource[] = []; //graphs where the triple (which the resource respresents the object) is defined

    constructor() { };

    isResource(): boolean {
        return false;
    }
    isURIResource(): boolean {
        return false;
    }
    isLiteral(): boolean {
        return false;
    }
    isBNode(): boolean {
        return false;
    }

    equals(node: ARTNode): boolean {
        return this.getNominalValue() == node.getNominalValue();
    }

    abstract getNominalValue(): string;
    abstract getShow(): string;

    setTripleGraphs(graphs: ARTURIResource[]) {
        this.tripleGraphs = graphs;
    }
    addTripleGraphs(graphs: ARTURIResource[]) {
        for (var i = 0; i < graphs.length; i++) {
            this.addTripleGraph(graphs[i]);
        }
    }
    addTripleGraph(graph: ARTURIResource) {
        for (var i = 0; i < this.tripleGraphs.length; i++) {
            if (graph.getURI() == this.tripleGraphs[i].getURI()) {
                return; //graph is already in graphs array => do not add the graph
            }
        }
        //graphToAdd not found in graphs array => add it
        this.tripleGraphs.push(graph);
    }
    getTripleGraphs(): ARTURIResource[] {
        return this.tripleGraphs;
    }

    abstract toNT(): string;

    setAdditionalProperty(propName: string, propValue: any): void {
        this[propName] = propValue;
    }
    deleteAdditionalProperty(propName: string) {
        delete this[propName];
    }
    getAdditionalProperty(propName: string) {
        return this[propName];
    }

    abstract clone(): ARTNode;
}

export abstract class ARTResource extends ARTNode {

    protected show: string;
    protected role: RDFResourceRolesEnum = RDFResourceRolesEnum.mention; //default, so node without role are considered mention
    protected graphs: ARTURIResource[] = []; //graphs where the resource is defined
    protected nature: ResourceNature[] = [];

    constructor(show?: string, role?: RDFResourceRolesEnum) {
        super();
        this.show = show;
        if (role != null) { this.role = role; }
    };

    isResource(): boolean {
        return true;
    }

    setShow(show: string) {
        this.show = show;
    }
    getShow(): string {
        if (this.show != null) {
            return this.show;
        } else {
            return this.getNominalValue();
        }
    }

    setRole(role: RDFResourceRolesEnum) {
        this.role = role;
    }
    getRole(): RDFResourceRolesEnum {
        return this.role;
    }

    addNature(role: RDFResourceRolesEnum, graph: ARTURIResource) {
        let n = this.nature.find(n => n.role == role);
        if (n != null) {
            n.graphs.push(graph);
        } else {
            this.nature.push({ role: role, graphs: [graph] });
        }
    }
    setNature(nature: ResourceNature[]) {
        this.nature = nature;
    }
    getNature(): ResourceNature[] {
        return this.nature;
    }

    setGraphs(graphs: ARTURIResource[]) {
        this.graphs = graphs;
    }
    addGraphs(graphsToAdd: ARTURIResource[]) {
        for (var i = 0; i < graphsToAdd.length; i++) {
            this.addGraph(graphsToAdd[i]);
        }
    }
    addGraph(graphToAdd: ARTURIResource) {
        for (var i = 0; i < this.graphs.length; i++) {
            if (graphToAdd.getURI() == this.graphs[i].getURI()) {
                return; //graph is already in graphs array => do not add the graph
            }
        }
        //graphToAdd not found in graphs array => add it
        this.graphs.push(graphToAdd);
    }
    getGraphs(): ARTURIResource[] {
        return this.graphs;
    }

    isDeprecated(): boolean {
        return this.getAdditionalProperty(ResAttribute.DEPRECATED);
    }

    abstract clone(): ARTResource;
}

export class ARTURIResource extends ARTResource {
    private uri: string;

    constructor(uri: string, show?: string, role?: RDFResourceRolesEnum) {
        super(show, role);
        if (uri.startsWith("<") && uri.endsWith(">")) {
            uri = uri.substring(1, uri.length-1);
        }
        this.uri = uri;
    }

    setURI(uri: string) {
        this.uri = uri;
    }
    getURI(): string {
        return this.uri;
    }

    isURIResource(): boolean {
        return true;
    };

    getBaseURI() {
        if (this.uri.lastIndexOf("#") > -1) {
            return this.uri.substring(0, this.uri.lastIndexOf("#") + 1);
        } else {
            return this.uri.substring(0, this.uri.lastIndexOf("/") + 1);
        }
    }

    getLocalName() {
        if (this.uri.lastIndexOf("#") > -1) {
            return this.uri.substring(this.uri.lastIndexOf("#") + 1);
        } else {
            return this.uri.substring(this.uri.lastIndexOf("/") + 1);
        }
    }

    getNominalValue(): string {
        return this.uri;
    };

    toNT(): string {
        return "<" + this.uri + ">";
    };

    clone(): ARTURIResource {
        let cloneRes = new ARTURIResource(this.uri, this.show, this.role);
        let props: string[] = Object.getOwnPropertyNames(this);
        for (var i = 0; i < props.length; i++) {
            cloneRes[props[i]] = this[props[i]];
        }
        return cloneRes;
    }

}

export class ARTBNode extends ARTResource {
    private id: string;

    constructor(id: string, show?: string, role?: RDFResourceRolesEnum) {
        super(show, role);
        this.id = id;
    }

    setId(id: string) {
        this.id = id;
    }
    getId(): string {
        return this.id;
    }

    isBNode(): boolean {
        return true;
    };

    getNominalValue(): string {
        return this.id;
    };

    toNT(): string {
        return this.getNominalValue();
    };

    clone(): ARTBNode {
        let cloneRes = new ARTBNode(this.id, this.show, this.role);
        let props: string[] = Object.getOwnPropertyNames(this);
        for (var i = 0; i < props.length; i++) {
            cloneRes[props[i]] = this[props[i]];
        }
        return cloneRes;
    }

}

export class ARTLiteral extends ARTNode {
    private value: string;
    private datatype: string;
    private lang: string;

    constructor(value: string, datatype?: string, lang?: string) {
        super();
        this.value = value;
        this.datatype = datatype;
        this.lang = lang;
    }

    setValue(value: string) {
        this.value = value;
    }
    getValue(): string {
        return this.value;
    };

    setDatatype(datatype: string) {
        this.datatype = datatype;
    }
    getDatatype(): string {
        return this.datatype;
    };

    setLang(lang: string) {
        this.lang = lang;
    }
    getLang(): string {
        return this.lang;
    };

    isLiteral(): boolean {
        return true;
    };

    isTypedLiteral(): boolean {
        return this.datatype != null;
    };

    getNominalValue(): string {
        return this.toNT();
    };

    getShow(): string {
        return this.value;
    }

    toNT(): string {
        var nt = JSON.stringify(this.value);
        if (this.lang != null && this.lang.length > 0) {
            nt += "@" + this.lang;
        } else if (this.datatype != null && this.datatype != "") {
            nt += "^^<" + this.datatype + ">";
        }
        return nt;
    };

    clone(): ARTLiteral {
        let cloneRes = new ARTLiteral(this.value);
        let props: string[] = Object.getOwnPropertyNames(this);
        for (var i = 0; i < props.length; i++) {
            cloneRes[props[i]] = this[props[i]];
        }
        return cloneRes;
    }

}

export class ARTPredicateObjects {
    private predicate: ARTURIResource;
    private objects: ARTNode[];

    constructor(predicate: ARTURIResource, objects: ARTNode[]) {
        this.predicate = predicate;
        this.objects = objects;
    }

    getPredicate(): ARTURIResource {
        return this.predicate;
    };

    getObjects(): ARTNode[] {
        return this.objects;
    };
}

export class ResAttribute {

    public static SHOW = "show";
    public static QNAME = "qname";
    public static ROLE = "role";
    public static EXPLICIT = "explicit";
    public static MORE = "more";
    public static NUM_INST = "numInst";
    public static HAS_CUSTOM_RANGE = "hasCustomRange";
    public static RESOURCE_POSITION = "resourcePosition";
    public static ACCESS_METHOD = "accessMethod";
    public static LANG = "lang";
    public static GRAPHS = "graphs"; //used in getResourceView response
    public static MEMBERS = "members"; //used for ordered collections
    public static INDEX = "index"; //used for members of ordered collections
    public static IN_SCHEME = "inScheme"; //used only in Skos.getSchemesMatrixPerConcept()
    public static NATURE = "nature"; //content is a triple separated by "-": <uri of class of resource> - <graph of ???> - <deprecated true/false>
    public static SCHEMES = "schemes"; //attribute of concepts in searchResource response
    public static TRIPLE_SCOPE = "tripleScope"; //used in the object in getResourceView
    public static SHOW_INTERPR = "show_interpretation"; //used for bnode

    //never in st responses, result of nature parsing
    public static DEPRECATED = "deprecated";

    //never in st responses, added because are useful for tree
    public static SELECTED = "selected"; //if true, render the node as selected
    public static NEW = "new"; //if true, the resource is made visible after the treeNodeComponent is initialized

    //useful in ResourceView to render potentially reified resource as not reified
    public static NOT_REIFIED = "notReified";//

    //useful in ResourceView to render the value as image
    public static IS_IMAGE = "isImage";

}

export enum RDFResourceRolesEnum {
    annotationProperty = "annotationProperty",
    cls = "cls",
    concept = "concept",
    conceptScheme = "conceptScheme",
    dataRange = "dataRange",
    datatypeProperty = "datatypeProperty",
    individual = "individual",
    mention = "mention",
    objectProperty = "objectProperty",
    ontology = "ontology",
    ontologyProperty = "ontologyProperty",
    property = "property",
    undetermined = "undetermined",
    xLabel = "xLabel",
    skosCollection = "skosCollection",
    skosOrderedCollection = "skosOrderedCollection",
    limeLexicon = "limeLexicon",
    ontolexLexicalEntry = "ontolexLexicalEntry",
    ontolexLexicalSense = "ontolexLexicalSense",
    ontolexForm = "ontolexForm"
}

export enum RDFTypesEnum {
    bnode = "bnode",
    literal = "literal",
    resource = "resource",
    undetermined = "undetermined",
    uri = "uri"
}

export abstract class ResourcePosition {
    position: ResourcePositionEnum;
    
    isLocal(): boolean {
        return false;
    }
    isRemote(): boolean {
        return false;
    }
    isUnknown(): boolean {
        return false;
    }

    abstract serialize(): string;

    static deserialize(resPositionJson: string): ResourcePosition {
        if (resPositionJson.startsWith(ResourcePositionEnum.local)) {
            return new LocalResourcePosition(resPositionJson.substring(resPositionJson.indexOf(":")+1));
        } else if (resPositionJson.startsWith(ResourcePositionEnum.remote)) {
            return new RemoteResourcePosition(resPositionJson.substring(resPositionJson.indexOf(":")+1));
        } else { //if (resPositionJson.startsWith(ResourcePositionEnum.unknown)) {
            return new UnknownResourcePosition();
        }
    }
}
export class LocalResourcePosition extends ResourcePosition {
    project: string;
    constructor(project: string) {
        super();
        this.position = ResourcePositionEnum.local;
        this.project = project;
    }
    isLocal(): boolean {
        return true;
    }
    serialize(): string {
        return this.position + ":" + this.project;
    }
}
export class RemoteResourcePosition extends ResourcePosition {
    datasetMetadata: ARTURIResource;
    constructor(datasetMetadata: string) {
        super();
        this.position = ResourcePositionEnum.remote;
        this.datasetMetadata = new ARTURIResource(datasetMetadata);
    }
    isRemote(): boolean {
        return true;
    }
    serialize(): string {
        return this.position + ":" + this.datasetMetadata.getURI();
    }
}
export class UnknownResourcePosition extends ResourcePosition {
    constructor() {
        super();
        this.position = ResourcePositionEnum.unknown;
    }
    isUnknown(): boolean {
        return true;
    }
    serialize(): string {
        return this.position + ":";
    }
}
export enum ResourcePositionEnum {
    local = "local",
    remote = "remote",
    unknown = "unknown"
}
export enum TripleScopes {
    local = "local",
    staged = "staged",
    del_staged = "del_staged",
    imported = "imported",
    inferred = "inferred"
}

export class ResourceNature {
    role: RDFResourceRolesEnum;
    graphs: ARTURIResource[];
}

export enum ShowInterpretation {
    descr = "descr", //class or datatype description
    ope = "ope" //object property expression
}

export enum MultischemeMode { //tells if the multi-scheme are considered in AND or in OR when browsing the concept tree
    and = "and",
    or = "or"
}

export class VBRequestOptions {

    errorAlertOpt: ErrorAlertOptions;
    ctxProject: Project;
    
    constructor({ errorAlertOpt, ctxProject }: VBRequestOptionsArgs = {}) {
        this.errorAlertOpt = errorAlertOpt != null ? errorAlertOpt : null;
        this.ctxProject = ctxProject != null ? ctxProject : null;
    }

    /**
     * Creates a copy of the `VBRequestOptions` instance, using the optional input as values to override existing values.
     * This method will not change the values of the instance on which it is being  called.
     * @param options 
     */
    merge(options?: VBRequestOptions): VBRequestOptions {
        //if options is provided and its parameters is not null, override the value of the current instance
        return new VBRequestOptions({
            errorAlertOpt: options && options.errorAlertOpt != null ? options.errorAlertOpt : this.errorAlertOpt,
            ctxProject: options && options.ctxProject != null ? options.ctxProject : this.ctxProject
        });
    }

    public static getRequestOptions(projectCtx?: ProjectContext): VBRequestOptions {
        if (projectCtx != null) {
            return new VBRequestOptions({ ctxProject: projectCtx.getProject() });
        } else {
            return null;
        }
    }
    
}
class ErrorAlertOptions {
    show: boolean; //if true HttpManager show the error alert in case of error response, skip the show alert otherwise
    exceptionsToSkip?: string[]; //if provided, tells for which exceptions the alert should be skipped (useful only if show is true)
}

export class Project {
    private name: string;
    private baseURI: string;
    private defaultNamespace: string;
    private accessible: boolean;
    private historyEnabled: boolean;
    private validationEnabled: boolean;
    private model: string;
    private lexicalizationModel: string;
    private open: boolean;
    private repositoryLocation: { location: "remote" | "local", serverURL?: string };
    private status: { status: string, message?: string };
    private shaclEnabled: boolean;
    private facets: {[key: string]: string} = {};
    private description: string;

    constructor(name?: string) {
        if (name != undefined) {
            this.name = name;
        }
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setBaseURI(baseURI: string) {
        this.baseURI = baseURI;
    }

    public getBaseURI(): string {
        return this.baseURI;
    }

    public setDefaultNamespace(defaultNamespace: string) {
        this.defaultNamespace = defaultNamespace;
    }

    public getDefaultNamespace(): string {
        return this.defaultNamespace;
    }

    public setAccessible(accessible: boolean) {
        this.accessible = accessible;
    }

    public isAccessible(): boolean {
        return this.accessible;
    }

    public setHistoryEnabled(enabled: boolean) {
        this.historyEnabled = enabled;
    }

    public isHistoryEnabled(): boolean {
        return this.historyEnabled;
    }

    public setValidationEnabled(enabled: boolean) {
        this.validationEnabled = enabled;
    }

    public isValidationEnabled(): boolean {
        return this.validationEnabled;
    }

    public setShaclEnabled(enabled: boolean) {
        this.shaclEnabled = enabled;
    }

    public isShaclEnabled(): boolean {
        return this.shaclEnabled;
    }

    public setModelType(modelType: string) {
        this.model = modelType;
    }
    public getModelType(prettyPrint?: boolean): string {
        if (prettyPrint) {
            return Project.getPrettyPrintModelType(this.model);
        }
        return this.model;
    }

    public setLexicalizationModelType(lexicalizationModel: string) {
        this.lexicalizationModel = lexicalizationModel;
    }
    public getLexicalizationModelType(prettyPrint?: boolean): string {
        if (prettyPrint) {
            return Project.getPrettyPrintModelType(this.lexicalizationModel);
        }
        return this.lexicalizationModel;
    }

    public static getPrettyPrintModelType(modelType: string) {
        if (modelType == RDFS.uri) {
            return "RDFS";
        } else if (modelType == OWL.uri) {
            return "OWL";
        } else if (modelType == SKOS.uri) {
            return "SKOS";
        } else if (modelType == SKOSXL.uri) {
            return "SKOSXL";
        } else if (modelType == OntoLex.uri) {
            return "OntoLex";
        } else if (modelType == EDOAL.uri) {
            return "EDOAL";
        } else {
            return modelType;
        }
    }

    public setOpen(open: boolean) {
        this.open = open;
    }
    public isOpen(): boolean {
        return this.open;
    }

    public getRepositoryLocation() {
        return this.repositoryLocation;
    }
    public setRepositoryLocation(repositoryLocation: { location: "remote" | "local", serverURL?: string }) {
        this.repositoryLocation = repositoryLocation;
    }
    public isRepositoryRemote(): boolean {
        return this.repositoryLocation.location == "remote";
    }

    public setStatus(status: { status: string, message?: string }) {
        this.status = status;
    }
    public getStatus(): { status: string, message?: string } {
        return this.status;
    }

    public setFacets(facets: {[key: string]: string}) {
        this.facets = facets;
    }
    public getFacets(): {[key: string]: string} {
        return this.facets;
    }
    public getFacet(facet: string): string {
        return this.facets[facet];
    }

    public setDescription(description: string) {
        this.description = description;
    }
    public getDescription(): string {
        return this.description;
    }

    public static deserialize(projJson: any): Project {
        let proj = new Project();
        proj.setName(projJson.name);
        proj.setBaseURI(projJson.baseURI);
        proj.setDefaultNamespace(projJson.defaultNamespace);
        proj.setAccessible(projJson.accessible);
        proj.setHistoryEnabled(projJson.historyEnabled);
        proj.setValidationEnabled(projJson.validationEnabled);
        proj.setModelType(projJson.model);
        proj.setLexicalizationModelType(projJson.lexicalizationModel);
        proj.setOpen(projJson.open);
        proj.setRepositoryLocation(projJson.repositoryLocation);
        proj.setStatus(projJson.status);
        proj.setShaclEnabled(projJson.shaclEnabled);
        proj.setFacets(projJson.facets);
        proj.setDescription(projJson.description);
        return proj;
    }

}

interface VBRequestOptionsArgs {
    /**
     * To prevent an alert dialog to show up in case of error during requests.
     * Is useful to handle the error from the component that invokes the service.
     */
    errorAlertOpt?: ErrorAlertOptions;

    ctxProject?: Project;
}

export class ProjectContext { //TODO move to Project model class?
    private project: Project;
    private prefixMappings: PrefixMapping[];
    private ctxVersion: VersionInfo; // version used
    private puBinging: ProjectUserBinding;
    private preferences: ProjectPreferences;
    private settings: ProjectSettings;

    constructor(project?: Project) {
        this.project = project;
        this.preferences = new ProjectPreferences();
        this.settings = new ProjectSettings();
    }

    setProject(project: Project) { this.project = project; }
    getProject(): Project { return this.project; }

    setPrefixMappings(mappings: PrefixMapping[]) { this.prefixMappings = mappings; }
    getPrefixMappings(): PrefixMapping[] { return this.prefixMappings; }

    setContextVersion(version: VersionInfo) { this.ctxVersion = version; }
    getContextVersion(): VersionInfo { return this.ctxVersion; }

    setProjectUserBinding(puBinging: ProjectUserBinding) { this.puBinging = puBinging; }
    getProjectUserBinding(): ProjectUserBinding { return this.puBinging; }

    getProjectPreferences(): ProjectPreferences { return this.preferences; }

    getProjectSettings(): ProjectSettings { return this.settings; }
}

