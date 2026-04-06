/**
 * ユーザー向けラベル（i18n 導入前の単一源泉）
 */
export const MESSAGES = {
  userList: {
    pageTitle: 'ユーザー一覧',
    tableCaption: '社員情報を表示します',
    tableAriaLabel: 'ユーザー一覧テーブル',
    loading: 'データを読み込んでいます…',
    empty: '表示するユーザーがいません',
    errorPrefix: 'エラー: ',
  },
  userDetail: {
    modalAriaLabel: 'ユーザー詳細',
    close: '閉じる',
    loading: 'ユーザー情報を読み込んでいます…',
    errorPrefix: 'エラー: ',
    employeeId: '社員番号',
    dateOfBirth: '生年月日',
    salary: '月給',
    rating: '評価ランク',
    group: '所属グループ',
    departmentHistory: '部署経歴',
    present: '現在',
  },
  dashstackTopBar: {
    searchLabel: 'Search',
    notificationsAria: (count: number) =>
      `Notifications, ${count} unread`,
    userMenuAria: (name: string) => `User menu, ${name}`,
    userName: 'Jone Aly',
    userRole: 'Admin',
  },
} as const
