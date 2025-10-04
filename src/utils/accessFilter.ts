/** @format */

import {
  NOT_NEED_TO_ACCESS,
  UNDER_DEVELOPMENT,
} from '../constants/GridConfigNames';
import { DrawerItemProps } from '@progress/kendo-react-layout';

export interface PageAccess {
  pageId: number;
  pageName: string;
  parentPage: PageAccess[];
}
export const flattenAccessPages = (pages: PageAccess[]): string[] => {
  const names: string[] = [];

  const traverse = (pageList: PageAccess[]) => {
    for (const page of pageList) {
      if (!names.includes(page.pageName)) {
        names.push(page.pageName);
      }
      // If these are child pages, rename to children and adjust accordingly
      if (page.parentPage?.length > 0) {
        traverse(page.parentPage);
      }
    }
  };

  traverse(pages);

  return names;
};

export const filterForAccess = (data: DrawerItemProps[]) => {
  const userData = JSON.parse(sessionStorage.getItem('userDetails') || 'null');
  const dev =
    process.env.ACCESS_IN_PROGRESS_PAGE == 'true' ? UNDER_DEVELOPMENT : '';
  const accessList: PageAccess[] = JSON.parse(
    sessionStorage.getItem('pageAccess') || '[]'
  );
  const roleName = userData?.roleName?.toLowerCase();
  const isAdmin = roleName === 'admin' || roleName === 'super admin';

  const accessibleKeys = flattenAccessPages(accessList);

  return data.filter((item) => {
    if (isAdmin) return true;
    if (!item.accessKey) return true;

    const itemAccessKeys = Array.isArray(item.accessKey)
      ? item.accessKey
      : [item.accessKey];

    if (
      (dev === UNDER_DEVELOPMENT &&
        itemAccessKeys.includes(UNDER_DEVELOPMENT)) ||
      itemAccessKeys.includes(NOT_NEED_TO_ACCESS)
    ) {
      return true;
    }

    const keysToCheck = [...itemAccessKeys, dev];
    return keysToCheck.some((key) => accessibleKeys.includes(key));
  });
};

interface FormButton {
  field: string;
  isdisable?: boolean;
  [key: string]: any;
}

export interface AccessFromButton {
  isAccessSubmitButtonShow: boolean;
  isAccessCancelButtonShow: boolean;
  isAddButtonDisabled: boolean;
  isCancelButtonDisabled: boolean;
  isAccessDownloadButtonShow: boolean;
  isAccessUploadButtonShow: boolean;
  isUploadButtonDisabled: boolean;
  isDownloadButtonDisabled: boolean;
  isAccessReportButtonShow: boolean;
  isReportButtonDisabled: boolean;
  isAccessSummaryButtonShow: boolean;
  isSummaryButtonDisabled: boolean;
}

export const getFormButtonStates = (formButtons: FormButton[] = []) => {
  const map = Object.fromEntries(formButtons.map((btn) => [btn.field, btn]));
  return {
    isAccessSubmitButtonShow: !!(map?.add && map?.add?.isView),
    isAccessCancelButtonShow: !!(map?.cancel && map?.cancel?.isView),
    isAddButtonDisabled: !map?.add?.isAdd,
    isCancelButtonDisabled: !map?.cancel?.isAdd,
    isAccessDownloadButtonShow: !!(map?.download && map?.download?.isView),
    isAccessUploadButtonShow: !!(map?.upload && map?.upload?.isView),
    isUploadButtonDisabled: !map?.upload?.isAdd,
    isDownloadButtonDisabled: !map?.download?.isAdd,
    isAccessReportButtonShow: !!(map?.report && map?.report?.isView),
    isReportButtonDisabled: !map?.report?.isAdd,
    isAccessSummaryButtonShow: !!(map?.summary && map?.summary?.isView),
    isSummaryButtonDisabled: !map?.summary?.isAdd,
    isAccessGeneratePRButtonShow: !!(
      (map?.GeneratePR && map?.GeneratePR?.isView) ||
      (map?.GenerateMR && map?.GenerateMR?.isView)
    ),
    isGeneratePRButtonDisabled:
      (map?.GeneratePR && !map?.GeneratePR?.isAdd) ||
      (map?.GenerateMR && !map?.GenerateMR?.isAdd),
    isAccessSaveAsDraftButtonShow: !!(
      map?.SaveAsDraft && map?.SaveAsDraft?.isView
    ),
    isSaveAsDraftButtonDisabled: !map?.SaveAsDraft?.isAdd,
  };
};
