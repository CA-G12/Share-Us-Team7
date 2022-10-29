import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './style.css'
import {
  Stack, CircularProgress, Box,
} from '@mui/material'
import ApiService from '../../services/ApiService'
import EventCard from './EventCard'
import FriendCard from './FriendCard'

const SearchResult: FC = () => {
  const [data, setData] = useState<any>([])
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const category = searchParams.get('category')

  useEffect(() => {
    setLoading(true)
    ApiService.get('/api/v1/search', {
      params: {
        input: searchParams.get('q'),
        category: searchParams.get('category'),
      },
    })
      .then((res) => {
        setData(res.data)
        setLoading(false)
      }).catch(() => setLoading(false))
  }, [searchParams])
  return (
    <Box
      sx={{
        margin: '10% 15%',
        height: '100vh',
      }}
    >

      {loading && (
      <Stack
        sx={{
          color: 'grey.500', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        spacing={2}
        direction="row"
      >
        <CircularProgress color="primary" />
      </Stack>
      )}

      {category && category === 'friends' && data?.data?.map((e:any) => (
        <FriendCard
          key={e.id}
          image={e.profileImg}
          username={e.username}
          bio={e.bio}
          button="Follow"
        />
      ))}

      {category && (category === 'event' || category === 'hashtags') && data?.data?.map((e:any) => (
        <EventCard
          key={e.id}
          image={e.img}
          eventname={e.name}
          startTime={e.startTime}
          description={e.description}
          status={e.status}
          Hashtags={e.Hashtags}
          button="Join"
        />
      ))}

      {!category && data?.data?.map((e:any) => (
        <EventCard
          key={e.id}
          image={e.img}
          eventname={e.name}
          startTime={e.startTime}
          description={e.description}
          status={e.status}
          Hashtags={e.Hashtags}
          button="Join"
        />
      ))}
    </Box>
  )
}
export default SearchResult