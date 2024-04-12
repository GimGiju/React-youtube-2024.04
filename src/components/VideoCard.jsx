import React from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { formatAgo } from "../util/date";

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const {title, thumbnails, channelTitle, publishedAt} = video.snippet;
  // if (typeof(video.id) !== 'string' && video.id.kind === 'youtube#channel')
  //   return;
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;
  return (
    <Card 
      sx={{ maxWidth: 400, minHeight: 340, cursor: 'pointer' }}
      onClick={() => { navigate(`/videos/watch/${videoId}`, {state: {video} }) }}
    >
      <CardContent >
      <img src={thumbnails.medium.url} alt={title} style={{ width: '100%' }} /> {/* 이미지의 너비를 100%로 설정하여 비디오 카드에 맞게 조절 */}
        <div>
          <Typography sx={{ fontSize: 16,
            fontWeight: 'bold',
            whiteSpace: 'normal',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
            }}>{title}</Typography>
          <Typography>{channelTitle}</Typography>
          <Typography>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}