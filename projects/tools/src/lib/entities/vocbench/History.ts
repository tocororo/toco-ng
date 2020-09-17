import { ARTURIResource, ARTResource, ARTNode } from "./vocbench";
import { Deserializer } from "./Deserializer";

export class CommitInfo {
    public commit: ARTURIResource;
    public user: ARTURIResource;
    public operation: ARTURIResource;
    public operationParameters: ParameterInfo[];
    public startTime: Date;
    public startTimeLocal: string;
    public endTime: Date;
    public endTimeLocal: string;
    public commentAllowed: boolean;
    // public comment: string;

    constructor(commit: ARTURIResource, user: ARTURIResource, operation: ARTURIResource, operationParameters: ParameterInfo[],
            startTime: Date, endTime: Date, commentAllowed?: boolean) {
        this.commit = commit;
        this.user = user;

        this.operation = operation;
        if (operation != null) {
            let stCoreServices: string = "st-core-services/";
            let operationShow = operation.getURI();
            var idx = operationShow.indexOf(stCoreServices);
            if (idx != -1) {
                operationShow = operationShow.substring(idx + stCoreServices.length);
            }
            this.operation.setShow(operationShow);
        }

        this.operationParameters = operationParameters;
        
        this.startTime = startTime;
        if (startTime != null) {
            this.startTimeLocal = Deserializer.parseDateTime(startTime);
        }
        this.endTime = endTime;
        if (endTime != null) {
            this.endTimeLocal = Deserializer.parseDateTime(endTime);
        }

        this.commentAllowed = commentAllowed;
    }
}

export class ParameterInfo {
    public name: string;
    public value: string;
    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }
}

export class CommitOperation {
    public subject: ARTResource;
    public predicate: ARTURIResource;
    public object: ARTNode;
    public context: ARTResource;
    constructor(subject: ARTResource, predicate: ARTURIResource, object: ARTNode, context: ARTResource) {
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
        this.context = context;
    }
}

export enum SortingDirection {
    Ascending = "Ascending",
    Descending = "Descending",
    Unordered = "Unordered"
}


export class VersionInfo {
    public versionId: string;
    public repositoryId: string;
    public dateTime: Date;
    public dateTimeLocal: string;
    public repositoryStatus: RepositoryStatus;
    public repositoryLocation: RepositoryLocation;

    constructor(versionId: string, repositoryId: string, dateTime: Date, repositoryLocation: RepositoryLocation, repositoryStatus: RepositoryStatus) {
        this.versionId = versionId;
        this.repositoryId = repositoryId;
        this.dateTime = dateTime;
        if (dateTime != null) {
            this.dateTimeLocal = Deserializer.parseDateTime(dateTime);
        }
        this.repositoryLocation = repositoryLocation;
        this.repositoryStatus = repositoryStatus;
    }
}


export enum RepositoryStatus {
    INITIALIZED = "INITIALIZED",
    UNITIALIZED = "UNITIALIZED"
}

export enum RepositoryLocation {
    LOCAL = "LOCAL",
    REMOTE = "REMOTE", 
    NOT_FOUND = "NOT_FOUND"
}

export class CommitDelta {
    additions: CommitOperation[];
    removals: CommitOperation[];
    additionsTruncated?: number;
    removalsTruncated?: number;
}
