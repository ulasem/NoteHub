'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote, CreateNotePayload } from '@/lib/api/clientApi';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { NoteTag } from '@/types/note';

import css from './NoteForm.module.css';

function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleCancel = () => router.push('/notes/filter/all');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newNote: CreateNotePayload) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      handleCancel();
    },
  });

  return (
    <form
      className={css.form}
      action={async formData => {
        const values = {
          title: formData.get('title') as string,
          content: formData.get('content') as string,
          tag: formData.get('tag') as NoteTag,
        };

        mutation.mutate(values);
      }}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag ?? 'Todo'}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
          <option value="Ideas">Ideas</option>
          <option value="Travel">Travel</option>
          <option value="Finance">Finance</option>
          <option value="Health">Health</option>
          <option value="Important">Important</option>
        </select>
        <span className={css.error} />
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>

        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
