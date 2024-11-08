import SearchIcon from '@mui/icons-material/Search';
import { Box, CircularProgress, InputBase, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Trip {
  _id: string;
  name: string;
}

interface Destination {
  _id: string;
  name: string;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '35ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTripResults, setSearchTripResults] = useState<Trip[]>([]);
  const [searchDestResults, setSearchDestResults] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (searchQuery) {
      const fetchResults = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${api}/trips/search?query=${searchQuery}`
          );
          const data = await response.json();
          console.log(data);
          setSearchTripResults(data.trips);
          setSearchDestResults(data.destinations);
          if (data.trips.length === 0 && data.destinations.length === 0) {
            setNoResults(true);
          } else {
            setNoResults(false);
          }
        } catch (error) {
          console.error('Error searching for trips:', error);
          setNoResults(true);
        } finally {
          setIsLoading(false);
        }
      };

      const delayDebounceFn = setTimeout(() => {
        fetchResults();
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchTripResults([]);
      setSearchDestResults([]);
      setNoResults(false);
    }
  }, [searchQuery]);

  const handleEnterTrip = (id: string) => {
    navigate(`/trips/${id}`);
  };

  const handleEnterDest = (id: string) => {
    navigate(`/destinations/${id}`);
  };

  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search trips and destinations…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Search>
      {(searchTripResults.length > 0 ||
        searchDestResults.length > 0 ||
        isLoading ||
        noResults) && (
        <Box
          sx={{
            position: 'absolute',
            top: 'calc(100%)',
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: 5,
            borderRadius: 1,
            zIndex: 10,
            maxHeight: '60vh',
            overflowY: 'auto',
            pt: 2,
          }}
        >
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {!noResults ? (
                <>
                  {searchTripResults.length > 0 && (
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: 'primary.dark',
                        fontWeight: 'bold',
                        ml: 3,
                      }}
                    >
                      Trips:
                    </Typography>
                  )}
                  {searchTripResults.length > 0 &&
                    searchTripResults.slice(0, 5).map((trip) => (
                      <Box
                        key={trip._id}
                        sx={{
                          m: 3,
                          p: 2,
                          cursor: 'pointer',
                          backgroundColor: 'primary.main',
                          borderRadius: 1,
                          boxShadow: 2,
                          color: 'white',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: 4,
                          },
                        }}
                        onClick={() => handleEnterTrip(trip._id)}
                      >
                        <Typography variant="subtitle1">
                          Trip: {trip.name}
                        </Typography>
                      </Box>
                    ))}
                  {searchDestResults.length > 0 && (
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: 'primary.dark',
                        fontWeight: 'bold',
                        ml: 3,
                      }}
                    >
                      Destinations:
                    </Typography>
                  )}
                  {searchDestResults.length > 0 &&
                    searchDestResults.slice(0, 5).map((destination) => (
                      <Box
                        key={destination._id}
                        sx={{
                          m: 3,
                          p: 2,
                          cursor: 'pointer',
                          backgroundColor: 'primary.light',
                          color: 'white',
                          borderRadius: 1,
                          boxShadow: 2,
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: 4,
                          },
                        }}
                        onClick={() => handleEnterDest(destination._id)}
                      >
                        <Typography variant="subtitle1">
                          Destination: {destination.name}
                        </Typography>
                      </Box>
                    ))}
                </>
              ) : (
                <Box
                  sx={{
                    m: 3,
                    p: 2,
                    backgroundColor: 'grey.300',
                    borderRadius: 1,
                    boxShadow: 2,
                    color: 'primary.dark',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Nothing found...
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.600' }}>
                    Search example: Wonderful Tokyo trip...
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};
