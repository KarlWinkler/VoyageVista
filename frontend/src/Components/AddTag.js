import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import getCookie from './GetCookie';

import AddButton from './AddButton';

const AddTag = () => {
  const [newTag, setNewTag] = useState('');

  const queryClient = useQueryClient();

  const { data: allTags, isLoading } = useQuery('tagsList', async () => {
    const response = await fetch('/api/tag');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  const addTag = useMutation({
    mutationFn: async (tag) => {
      const response = await fetch('/api/auth/users/add_tag/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(tag),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      queryClient.invalidateQueries('tags');
      queryClient.invalidateQueries('tagsList');
      queryClient.invalidateQueries('userTags');
      return response.json();
    },
  });

  return (
    <div className={'add-tag'}>
      <select
        type='dropdown'
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      >
        <option value=''>Select a tag</option>
        {allTags?.map((tag) => (
          <option key={tag.id} value={tag.id}>{tag.name}</option>
        ))}
      </select>
      <AddButton onClick={() => {
        addTag.mutate({ tag_id: newTag });
        setNewTag('');
      }}>Add Tag</AddButton>
    </div>
  );
};

export default AddTag;