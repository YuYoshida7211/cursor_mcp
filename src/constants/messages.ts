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
  dashstackTopBar: {
    searchLabel: 'Search',
    notificationsAria: (count: number) =>
      `Notifications, ${count} unread`,
    userMenuAria: (name: string) => `User menu, ${name}`,
    userName: 'Jone Aly',
    userRole: 'Admin',
  },
} as const
