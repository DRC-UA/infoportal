export type Logger = {
    error: (_: string) => void;
    info: (_: string) => void;
};
export declare namespace Kobo {
    namespace V1 {
        type SubmitResponse = {
            message?: 'Successful submission.';
            formid?: Kobo.Answer.Id;
            encrypted?: boolean;
            instanceID?: string;
            submissionDate?: string;
            markedAsCompleteDate?: string;
            error?: 'Duplicate submission';
        };
        type KoboV1Form = {
            uuid: string;
            id_string: Kobo.Answer.Id;
        };
    }
    interface Paginate<T> {
        count: number;
        results: T[];
    }
    type Hook = {
        url: string;
        logs_url: string;
        asset: number;
        uid: 'hLgBEVbijurruSrU3nc7d9';
        name: 'InfoPortal';
        endpoint: string;
        active: true;
        export_type: 'json';
        auth_level: 'no_auth';
        success_count: number;
        failed_count: number;
        pending_count: number;
        settings: any;
        date_modified: Date;
        email_notification: boolean;
        subset_fields: any[];
        payload_template: '';
    };
    type FormId = Form.Id;
    type Form = Form.Form;
    namespace Form {
        type Id = string;
        type Question = {
            name: string;
            /**
             * @deprecated
             * This variable is set by Kobo based `name` since this last one can be undefined and duplicated.
             * To simplify usage in this app, `name` = $autoname.
             */
            $autoname: string;
            $kuid: string;
            $qpath: string;
            $xpath: string;
            label?: string[];
            hint?: string[];
            appearance?: 'multiline';
            file?: string;
            type: QuestionType;
            calculation: string;
            select_from_list_name?: string;
        };
        type Choice = {
            $autovalue: string;
            $kuid: string;
            label: string[];
            list_name: string;
            name: string;
        };
        enum DeploymentStatus {
            deployed = "deployed",
            archived = "archived",
            draft = "draft"
        }
        type File = {
            asset: string;
            content: string;
            date_created: string;
            description: string;
            file_type: string;
            metadata: {
                filename: string;
                hash: string;
                mimetype: string;
            };
            uid: string;
            url: string;
            user: string;
            user__username: string;
        };
        type QuestionType = 'file' | 'deviceid' | 'end_repeat' | 'begin_repeat' | 'begin_group' | 'select_one' | 'note' | 'datetime' | 'end_group' | 'username' | 'geopoint' | 'image' | 'today' | 'text' | 'calculate' | 'integer' | 'decimal' | 'select_multiple' | 'select_one_from_file' | 'date' | 'start' | 'end';
        interface Form {
            name: string;
            deployment__links: {
                iframe_url: string;
                offline_url: string;
                preview_url: string;
                single_iframe_url: string;
                single_once_iframe_url: string;
                single_once_url: string;
                single_url: string;
                url: string;
            };
            content: {
                choices?: Choice[];
                schema: string;
                settings: {
                    version: string;
                    default_language: string;
                };
                survey: Question[];
                translated: ['hint', 'label', 'media::image'];
                translations: string[];
            };
            deployment_status: DeploymentStatus;
            has_deployment: boolean;
            date_created: Date;
            date_modified: Date;
            deployed_version_id: string;
            deployment__active: boolean;
            deployment__submission_count: 0;
            owner__username: string;
            subscribers_count: 0;
            uid: string;
            version_id: string;
            files: File[];
        }
    }
    type Answer = Answer.T;
    type AnswerId = Answer.Id;
    namespace Answer {
        type T = MetaData & Record<string, any>;
        type Id = string;
        type UUID = string;
        type Filter = {
            start?: Date;
            end?: Date;
            limit?: number;
            offset?: number;
        };
        type UpdateResponse = {
            count: number;
            successes: number;
            failures: number;
            results: any[];
        };
        interface Version {
            uid: string;
            url: string;
            content_hash: string;
            date_deployed: Date;
            date_modified: Date;
        }
        interface MetaData {
            _id: Id;
            start: Date;
            end: Date;
            __version__?: string;
            _xform_id_string: string;
            _uuid: UUID;
            _attachments?: Attachment[];
            _status: Status;
            _geolocation: Geolocation;
            _submission_time: Date;
            _tags: Tags[];
            _notes: Notes[];
            _validation_status: {
                timestamp: number;
                uid: 'validation_status_approved';
                by_whom: string;
            };
            _submitted_by: any;
        }
        interface Status {
            SubmittedViaWeb: 'submitted_via_web';
        }
        enum Validation {
            validation_status_on_hold = "validation_status_on_hold",
            validation_status_approved = "validation_status_approved",
            validation_status_not_approved = "validation_status_not_approved",
            no_status = "no_status"
        }
        type Geolocation = [number, number];
        type Tags = any;
        type Notes = any;
        type Attachment = {
            download_url: string;
            filename: string;
            download_small_url: string;
            id: string;
        };
    }
}
//# sourceMappingURL=Kobo.d.ts.map