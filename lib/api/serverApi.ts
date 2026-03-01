import { cookies } from 'next/headers';
import { nextServer } from './api';
import { FetchNotesResponse } from './clientApi';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export const fetchNotesServer = async (
  page: number = 1,
  search: string = '',
  tag?: string,
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag && tag !== 'all' && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkSessionServer = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const getMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
