import { http, HttpResponse, delay } from 'msw'
import type { GetUsersResponse, GetUserDetailResponse } from '@/features/UserList/types'

const MOCK_USERS: GetUsersResponse = {
  users: [
    {
      employeeId: 'E-1001',
      name: '山田 太郎',
      age: 34,
      address: '東京都渋谷区本町1-2-3',
      group: 'エンジニア',
      hireDate: '2018-04-01',
      phone: '090-1111-2222',
      note: 'フロントエンド担当',
    },
    {
      employeeId: 'E-1002',
      name: '佐藤 花子',
      age: 29,
      address: '神奈川県横浜市中区桜木町4-5-6',
      group: '経理',
      hireDate: '2020-07-15',
      phone: '080-3333-4444',
      note: '月次締めリード',
    },
    {
      employeeId: 'S-2001',
      name: '鈴木 一郎',
      age: 41,
      address: '大阪府大阪市北区梅田7-8-9',
      group: '営業',
      hireDate: '2016-10-01',
      phone: '070-5555-6666',
      note: '新規開拓チーム',
    },
    {
      employeeId: 'E-1003',
      name: '高橋 美咲',
      age: 26,
      address: '愛知県名古屋市中村区名駅1-2-3',
      group: 'エンジニア',
      hireDate: '2022-01-10',
      phone: '090-7777-8888',
      note: 'バックエンド担当（育成中）',
    },
  ],
}

const MOCK_USER_DETAILS: Record<string, GetUserDetailResponse> = {
  'E-1001': {
    employeeId: 'E-1001',
    name: '山田 太郎',
    dateOfBirth: '1990-05-15',
    salary: 450000,
    rating: 'A',
    group: 'エンジニア',
    departmentHistory: [
      { department: 'インフラ部', from: '2018-04', to: '2020-03' },
      { department: 'フロントエンド開発部', from: '2020-04', to: null },
    ],
  },
  'E-1002': {
    employeeId: 'E-1002',
    name: '佐藤 花子',
    dateOfBirth: '1995-11-30',
    salary: 380000,
    rating: 'B',
    group: '経理',
    departmentHistory: [
      { department: '総務部', from: '2020-07', to: '2021-12' },
      { department: '経理部', from: '2022-01', to: null },
    ],
  },
  'S-2001': {
    employeeId: 'S-2001',
    name: '鈴木 一郎',
    dateOfBirth: '1983-02-20',
    salary: 520000,
    rating: 'C',
    group: '営業',
    departmentHistory: [
      { department: '営業一部', from: '2016-10', to: '2019-09' },
      { department: '営業二部', from: '2019-10', to: '2023-03' },
      { department: '新規開拓チーム', from: '2023-04', to: null },
    ],
  },
  'E-1003': {
    employeeId: 'E-1003',
    name: '高橋 美咲',
    dateOfBirth: '1998-08-08',
    salary: 320000,
    rating: 'B',
    group: 'エンジニア',
    departmentHistory: [
      { department: 'バックエンド開発部', from: '2022-01', to: null },
    ],
  },
}

export const usersHandlers = [
  http.get('/api/users', async () => {
    await delay()
    return HttpResponse.json(MOCK_USERS)
  }),

  http.get('/api/users/:employeeId', async ({ params }) => {
    await delay()
    const { employeeId } = params
    const detail = MOCK_USER_DETAILS[employeeId as string]
    if (!detail) {
      return HttpResponse.json({ message: 'ユーザーが見つかりません' }, { status: 404 })
    }
    return HttpResponse.json(detail)
  }),
]
