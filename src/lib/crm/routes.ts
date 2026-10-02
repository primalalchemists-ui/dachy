export const CRM_HOME_PATH = "/admin";
export const CRM_LOGIN_PATH = "/admin/login";
export const CRM_LEADS_PATH = "/admin/leads";
export const CRM_PIPELINE_PATH = "/admin/pipeline";

export function crmLeadPath(id: string) {
  return `${CRM_LEADS_PATH}/${id}`;
}
