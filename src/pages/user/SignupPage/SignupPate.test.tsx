import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SignupPage from './SignupPage';

describe('SignupPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByLabelText('ユーザー名')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード（確認用）')).toBeInTheDocument();
    expect(
      screen.getByLabelText('お名前（アプリ内で表示される名前）')
    ).toBeInTheDocument();
    expect(screen.getByRole('label_confirm_term')).toBeInTheDocument();
  });

  it('validates form inputs and displays errors', async () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: '登録' }));

    await waitFor(() => {
      expect(screen.getByText('※メールアドレスは必須です')).toBeInTheDocument();
      expect(screen.getByText('※ユーザー名は必須です')).toBeInTheDocument();
      expect(screen.getByText('※パスワードは必須です')).toBeInTheDocument();
      expect(
        screen.getByText('※パスワード（確認用）は必須です')
      ).toBeInTheDocument();
      expect(screen.getByText('※お名前は必須です')).toBeInTheDocument();
      expect(
        screen.getByText('※利用規約を確認し、同意してください。')
      ).toBeInTheDocument();
    });
  });
});
