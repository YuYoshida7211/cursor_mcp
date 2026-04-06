import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { MESSAGES } from '@/constants/messages'
import { useUserDetail } from '@/features/UserList/hooks/useUserDetail'
import type { UserRating } from '@/features/UserList/types'
import './UserDetailModal.css'

const MSG = MESSAGES.userDetail

const RATING_LABEL: Record<UserRating, string> = {
  A: 'A（優秀）',
  B: 'B（良好）',
  C: 'C（標準）',
  D: 'D（要改善）',
}

function formatSalary(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`
}

function AvatarPlaceholder() {
  return (
    <svg
      className="user-detail-modal__avatar"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="40" fill="#e8eef8" />
      <circle cx="40" cy="32" r="14" fill="#b0c4e8" />
      <ellipse cx="40" cy="70" rx="22" ry="16" fill="#b0c4e8" />
    </svg>
  )
}

interface UserDetailModalProps {
  employeeId: string | null
  onClose: () => void
}

export function UserDetailModal({ employeeId, onClose }: UserDetailModalProps) {
  const result = useUserDetail(employeeId)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [employeeId])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!employeeId) return null

  return createPortal(
    <div
      className="user-detail-modal__overlay"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className="user-detail-modal__card"
        role="dialog"
        aria-modal="true"
        aria-label={MSG.modalAriaLabel}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="user-detail-modal__close"
          onClick={onClose}
          aria-label={MSG.close}
        >
          ✕
        </button>

        {result.status === 'loading' && (
          <p className="user-detail-modal__state" aria-live="polite">
            {MSG.loading}
          </p>
        )}

        {result.status === 'error' && (
          <p className="user-detail-modal__state user-detail-modal__state--error" role="alert">
            {MSG.errorPrefix}{result.error}
          </p>
        )}

        {result.status === 'success' && (
          <>
            <div className="user-detail-modal__header">
              <AvatarPlaceholder />
              <div className="user-detail-modal__header-info">
                <h3 className="user-detail-modal__name" id="user-detail-modal-title">
                  {result.detail.name}
                </h3>
                <span className="user-detail-modal__employee-id">
                  {MSG.employeeId}: {result.detail.employeeId}
                </span>
              </div>
              <span className="user-detail-modal__rating" data-rating={result.detail.rating}>
                {result.detail.rating}
              </span>
            </div>

            <div className="user-detail-modal__body">
              <dl className="user-detail-modal__dl">
                <div className="user-detail-modal__dl-row">
                  <dt>{MSG.dateOfBirth}</dt>
                  <dd>{result.detail.dateOfBirth}</dd>
                </div>
                <div className="user-detail-modal__dl-row">
                  <dt>{MSG.salary}</dt>
                  <dd>{formatSalary(result.detail.salary)}</dd>
                </div>
                <div className="user-detail-modal__dl-row">
                  <dt>{MSG.rating}</dt>
                  <dd>{RATING_LABEL[result.detail.rating]}</dd>
                </div>
                <div className="user-detail-modal__dl-row">
                  <dt>{MSG.group}</dt>
                  <dd>{result.detail.group}</dd>
                </div>
              </dl>

              <section className="user-detail-modal__dept-section" aria-labelledby="dept-history-heading">
                <h4 className="user-detail-modal__dept-heading" id="dept-history-heading">
                  {MSG.departmentHistory}
                </h4>
                <ol className="user-detail-modal__dept-list">
                  {result.detail.departmentHistory.map((entry, idx) => (
                    <li key={idx} className="user-detail-modal__dept-item">
                      <span className="user-detail-modal__dept-dot" aria-hidden="true" />
                      <div className="user-detail-modal__dept-content">
                        <span className="user-detail-modal__dept-name">{entry.department}</span>
                        <span className="user-detail-modal__dept-period">
                          {entry.from} 〜 {entry.to ?? MSG.present}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
