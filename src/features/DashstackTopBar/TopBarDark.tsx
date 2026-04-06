import { MESSAGES } from '@/constants/messages'
import { DASHSTACK_TOP_BAR } from '@/constants/dashstack-top-bar'
import '@/features/DashstackTopBar/TopBarDark.css'

const AVATAR_SRC =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=88&h=88&fit=crop&auto=format'

export function TopBarDark() {
  const { searchLabel, userName, userRole } = MESSAGES.dashstackTopBar
  const notificationsAria = MESSAGES.dashstackTopBar.notificationsAria(
    DASHSTACK_TOP_BAR.notificationCount,
  )
  const userMenuAria = MESSAGES.dashstackTopBar.userMenuAria(userName)

  return (
    <header className="top-bar-dark" role="banner">
      <div className="top-bar-dark__inner">
        <div className="top-bar-dark__search" role="search">
          <label className="top-bar-dark__search-label" htmlFor="dashstack-topbar-search">
            {searchLabel}
          </label>
          <span className="top-bar-dark__search-icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="7"
                cy="7"
                r="5.25"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M10.5 10.5 14 14"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <input
            id="dashstack-topbar-search"
            className="top-bar-dark__search-input"
            type="search"
            placeholder={searchLabel}
            autoComplete="off"
          />
        </div>

        <div className="top-bar-dark__actions">
          <button
            type="button"
            className="top-bar-dark__notify"
            aria-label={notificationsAria}
          >
            <span className="top-bar-dark__notify-icon" aria-hidden>
              <svg width="24" height="26" viewBox="0 0 24 26" fill="none">
                <path
                  d="M12 3a5 5 0 0 0-5 5v3.1l-.8 2.4A2 2 0 0 0 8.1 16h7.8a2 2 0 0 0 1.9-2.5l-.8-2.4V8a5 5 0 0 0-5-5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 20a2 2 0 0 0 4 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="top-bar-dark__notify-badge">
              {DASHSTACK_TOP_BAR.notificationCount}
            </span>
          </button>

          <button
            type="button"
            className="top-bar-dark__profile"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label={userMenuAria}
          >
            <img
              className="top-bar-dark__avatar"
              src={AVATAR_SRC}
              alt=""
              width={DASHSTACK_TOP_BAR.avatarPx}
              height={DASHSTACK_TOP_BAR.avatarPx}
              decoding="async"
            />
            <span className="top-bar-dark__profile-text">
              <span className="top-bar-dark__profile-name">{userName}</span>
              <span className="top-bar-dark__profile-role">{userRole}</span>
            </span>
            <span className="top-bar-dark__chevron-wrap" aria-hidden>
              <svg
                className="top-bar-dark__chevron"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M1 1.5 5 4.5 9 1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
