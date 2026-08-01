import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Members from './Members';

beforeEach(() => {
  vi.restoreAllMocks();
});

const renderMembers = () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'gymsys_members') {
      return JSON.stringify([
        { id: 1, name: 'Khaled', email: 'khaled@gmail.com', phone: '+201282708833', status: 'Active', expiry: '2026-12-31' },
        { id: 2, name: 'Ahmed', email: 'ahmed@gmail.com', phone: '+201090801144', status: 'Inactive', expiry: '2023-06-30' },
        { id: 3, name: 'Mona', email: 'mona@gmail.com', phone: '+201001112233', status: 'Active', expiry: '2026-09-01' },
      ]);
    }

    return null;
  });

  return render(
    <MemoryRouter>
      <Members />
    </MemoryRouter>
  );
};

describe('Members page', () => {
  it('adds a new member and shows the success notice', async () => {
    const user = userEvent.setup();
    renderMembers();

    await user.click(screen.getByRole('button', { name: /add member/i }));

    await user.type(await screen.findByLabelText(/member name/i), 'Ali');
    await user.type(screen.getByLabelText(/member email/i), 'ali@example.com');
    await user.type(screen.getByLabelText(/member phone/i), '01000000000');
    await user.type(screen.getByLabelText(/membership expiry/i), '2027-12-31');

    await user.click(screen.getByRole('button', { name: /save member/i }));

    await waitFor(() => {
      expect(screen.getByText(/member added successfully/i)).toBeInTheDocument();
    });
  });

  it('deletes a member from the list', async () => {
    const user = userEvent.setup();
    renderMembers();

    const khaledRow = screen.getAllByText('Khaled')[0].closest('tr');
    await user.click(within(khaledRow).getByRole('button', { name: /delete/i }));
    await user.click(screen.getByRole('button', { name: /^delete$/i }));

    await waitFor(() => {
      expect(screen.getByText(/member deleted successfully/i)).toBeInTheDocument();
    });
  });

  it('filters members by status', async () => {
    const user = userEvent.setup();
    renderMembers();

    await user.selectOptions(screen.getByLabelText(/filter members by status/i), 'Inactive');

    await waitFor(() => {
      expect(screen.getAllByText('Ahmed').length).toBeGreaterThan(0);
      expect(screen.queryAllByText('Khaled').length).toBe(0);
    });
  });
});
