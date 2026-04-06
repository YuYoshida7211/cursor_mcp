import { http, HttpResponse, delay } from 'msw'
import type { GetUsersResponse } from '@/features/UserList/types'

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

export const usersHandlers = [
  http.get('/api/users', async () => {
    await delay()
    return HttpResponse.json(MOCK_USERS)
  }),
]
