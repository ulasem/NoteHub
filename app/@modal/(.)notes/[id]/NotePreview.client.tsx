'use client';

import { fetchNoteById } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

import css from './NotePreview.module.css';

interface NotePreviewClientProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
  const router = useRouter();
  const onClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (!note) {
    return <p>Could not fetch note. {error?.message}</p>;
  }

  return (
    <Modal onClose={onClose}>
      <button className={css.backBtn} onClick={onClose} aria-label="Close modal">
        ← Back
      </button>
      <h2>{note.title}</h2>
      <b>{note.tag}</b>
      <p>{note.content}</p>
      <p>{note.createdAt}</p>
    </Modal>
  );
};

export default NotePreviewClient;
