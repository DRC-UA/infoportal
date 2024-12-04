"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kobo = void 0;
var Kobo;
(function (Kobo) {
    let Form;
    (function (Form) {
        let DeploymentStatus;
        (function (DeploymentStatus) {
            DeploymentStatus["deployed"] = "deployed";
            DeploymentStatus["archived"] = "archived";
            DeploymentStatus["draft"] = "draft";
        })(DeploymentStatus = Form.DeploymentStatus || (Form.DeploymentStatus = {}));
    })(Form = Kobo.Form || (Kobo.Form = {}));
    let Answer;
    (function (Answer) {
        let Validation;
        (function (Validation) {
            Validation["validation_status_on_hold"] = "validation_status_on_hold";
            Validation["validation_status_approved"] = "validation_status_approved";
            Validation["validation_status_not_approved"] = "validation_status_not_approved";
            Validation["no_status"] = "no_status";
        })(Validation = Answer.Validation || (Answer.Validation = {}));
    })(Answer = Kobo.Answer || (Kobo.Answer = {}));
})(Kobo || (exports.Kobo = Kobo = {}));
