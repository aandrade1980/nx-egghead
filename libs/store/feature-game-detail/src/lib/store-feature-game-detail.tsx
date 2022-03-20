import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

/** Material UI */
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

/** Styles */
import styles from './store-feature-game-detail.module.scss';

/** Types */
import { Game } from '@nxegghead/api/util-interfaces';
import { Spinner } from '@nxegghead/store/ui-shared';

/** Utils */
import { formatRating } from '@nxegghead/store/util-formatters';

type TParams = { id: string };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StoreFeatureGameDetailProps
  extends RouteComponentProps<TParams> {}

export function StoreFeatureGameDetail(props: StoreFeatureGameDetailProps) {
  const { id } = props.match.params;

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/games/${id}`);
        const gameDetails = await response.json();

        setGame(gameDetails);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchGame();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles['container']}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={styles['game-card-media']}
            image={game?.image}
            title={game?.name}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {game?.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={styles['game-rating']}
            >
              <strong>Rating:</strong> {formatRating(game?.rating as number)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default StoreFeatureGameDetail;
