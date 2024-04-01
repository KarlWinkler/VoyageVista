import React, { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';

import Box from '../Components/Box';
import Button from  '../Components/Button';
import WebsocketComment from '../Components/WebsocketComment';

import getCookie from '../Components/GetCookie';
import '../styles/comment.scss';

const NewComment = ({ user, location_id, newComment, setNewComment, content, setContent, postComment, sendMessage }) => {
    if (newComment) {
        return (
        <form onSubmit={(e) => { 
            console.log('clicked')
            handleCreateComment(e, user, location_id, content, postComment)
            sendMessage(user, content, location_id)
        }} >
            <p>{user.name}</p>
            <textarea placeholder='New Comment' value={content} onChange={(e) => setContent(e.target.value)} />
            <div className='form-inputs'>
                <Button minor text='Cancel' onClick={(event) => { handleNewComment(event, newComment, setNewComment) }} />
                <input className='button secondary' type='submit' value='Post Comment' />
            </div>
        </form>
        );
    } else if (user?.username){
        return (
        <>
            <Button className='comment-add-button' text='Add Comment' tertiary
                onClick={(event) => {
                    handleNewComment(event, newComment, setNewComment)
                }} />
        </>
        );
    } else {
        return (
        <Button text='Log in to comment!' to='/login' secondary />
        );
    }
}

const Comments = ({ comments }) => {
    if (comments?.length > 0) {
        return comments?.map((comment, index) => {
            return (
                <Box key={index} className='comment'>
                    <p className='comment-username'>{comment.user.username}</p>
                    <p className='comment-content'>{comment.content}</p>
                </Box>
            );
        });
    } else {
        return (
        <p>Be the first to comment!</p>
        );
    }
}

const handleNewComment = (event, newComment, setNewComment) => {
    event.preventDefault();
    setNewComment(!newComment);
}

const handleCreateComment = (event, user, location_id, content, postComment) => {
    event.preventDefault();
    postComment.mutate({ 
        user: user.id,
        content: content,
        location: location_id
    });
}

function Comment({ user, location_id }) {
    const [newComment, setNewComment] = useState(false);
    const [content, setContent] = useState('');
    const [data, setData] = useState('')

    const queryClient = useQueryClient();
    const { data: comments , isLoading } = useQuery({
      queryKey: ['comments'],
      queryFn: async () => {
        return fetch(`/api/location/${location_id}/comments/`).then(async res => {
            let response = await res.json()
            console.log(response)
            return response
        }
        );
      },
      staleTime: 5 * 1000 * 60,
    });
    const postComment = useMutation({
        mutationFn: async (NewComment) => {
            return fetch('/api/location/comments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify(NewComment),
            }).then(res => res.json());
        },
        onSuccess: () => {
            setContent('');
            setNewComment(false);
            queryClient.invalidateQueries('comments');
        }
    })
    const websocket = useRef()
    useEffect(() => {
      let update = (data) => {
        setData(data)
      }

      websocket.current = websocket.current || new WebSocket(`ws://localhost:8000/ws/location/${location_id}/`)
      console.log(websocket.current)
      websocket.current.onopen = e => {
        console.log('open', e)
      }
      websocket.current.onmessage = e => {
        update(JSON.parse(e.data))
      }
  
      websocket.current.onerror = e => {
        console.log('error', e)
      }
    }, [])
  
    let sendMessage = (user, comment, location_id) => {
      console.log('send message')
      websocket.current.send(JSON.stringify({
        comment: comment,
        user: user,
        location_id: location_id,
      }))
    } 

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            <WebsocketComment data={data} />
            <NewComment
                user={user}
                location_id={location_id}
                newComment={newComment}
                setNewComment={setNewComment}
                content={content}
                setContent={setContent}
                postComment={postComment}
                sendMessage={sendMessage}
            />
            <Comments comments={comments} />
        </>
    )
}

export default Comment;