import { useState } from 'react'
import { MESSAGES } from '@/constants/messages'
import { useUsers } from '@/features/UserList/hooks/useUsers'
import { UserDetailModal } from '@/features/UserList/UserDetailModal'
import './style.css'

const MSG = MESSAGES.userList

export default function UserList() {
  const result = useUsers()
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)

  const handleRowClick = (employeeId: string) => {
    setSelectedEmployeeId(employeeId)
  }

  const handleCloseModal = () => {
    setSelectedEmployeeId(null)
  }

  return (
    <main className="user-list" aria-label="ユーザー一覧ページ">
      <div className="user-list__container">
        <h2 className="user-list__title">{MSG.pageTitle}</h2>

        {result.status === 'loading' && (
          <p className="user-list__state" aria-live="polite">
            {MSG.loading}
          </p>
        )}

        {result.status === 'error' && (
          <p className="user-list__state user-list__state--error" role="alert">
            {MSG.errorPrefix}{result.error}
          </p>
        )}

        {result.status === 'success' && result.users.length === 0 && (
          <p className="user-list__state" aria-live="polite">
            {MSG.empty}
          </p>
        )}

        {result.status === 'success' && result.users.length > 0 && (
          <div
            className="user-list__tableWrap"
            role="region"
            aria-label={MSG.tableAriaLabel}
          >
            <table className="user-list__table">
              <caption className="user-list__caption">{MSG.tableCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">社員番号</th>
                  <th scope="col">氏名</th>
                  <th scope="col">年齢</th>
                  <th scope="col">住所</th>
                  <th scope="col">所属グループ</th>
                  <th scope="col">雇用年月日</th>
                  <th scope="col">連絡先(電話番号)</th>
                  <th scope="col">備考</th>
                </tr>
              </thead>
              <tbody>
                {result.users.map((u) => (
                  <tr
                    key={u.employeeId}
                    className="user-list__row--clickable"
                    onClick={() => handleRowClick(u.employeeId)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${u.name} の詳細を表示`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleRowClick(u.employeeId)
                      }
                    }}
                  >
                    <td>{u.employeeId}</td>
                    <td>{u.name}</td>
                    <td>{u.age}</td>
                    <td>{u.address}</td>
                    <td>{u.group}</td>
                    <td>{u.hireDate}</td>
                    <td>{u.phone}</td>
                    <td>{u.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <UserDetailModal
        employeeId={selectedEmployeeId}
        onClose={handleCloseModal}
      />
    </main>
  )
}
