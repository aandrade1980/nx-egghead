import { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

/** Styles */
import styles from './app.module.scss';

/** Components */
import { Header, Spinner } from '@nxegghead/store/ui-shared';
import { StoreFeatureGameDetail } from '@nxegghead/store/feature-game-detail';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

/** Utils */
import { formatRating } from '@nxegghead/store/util-formatters';

/** Types */
import { Game } from '@nxegghead/api/util-interfaces';

export function App() {
  const history = useHistory();

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getAllGames = async () => {
      try {
        const response = await fetch('/api/games');
        const fetchedGames = await response.json();

        setGames(fetchedGames);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getAllGames();
  }, []);

  return (
    <>
      <Header title="Board Game Hoard" />
      <div className={styles['container']} data-testId="app-container">
        <div className={styles['games-layout']}>
          {loading ? (
            <Spinner />
          ) : (
            games.map((game) => (
              <Card
                key={game.id}
                className={styles['game-card']}
                onClick={() => history.push(`/game/${game.id}`)}
              >
                <CardActionArea>
                  <CardMedia
                    className={styles['game-card-media']}
                    image={game.image}
                    title={game.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {game.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {game.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className="game-rating"
                    >
                      <strong>Rating:</strong> {formatRating(game.rating)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </div>
      </div>

      <Route path="/game/:id" component={StoreFeatureGameDetail} />
    </>
  );
}

export default App;
