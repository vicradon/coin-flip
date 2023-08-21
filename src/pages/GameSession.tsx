import {
  Button,
  Text,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Flex,
  Box,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layout/Main";
import http from "../services/http";

interface Game {
  id: string;
  flip_reason: string;
  player1Username: string;
  player2Username?: string;
  winner?: "player1" | "player2";
}

export const GameSession = () => {
  const navigate = useNavigate();
  const { gamecode } = useParams();
  const [game, setGame] = useState<Game>({
    id: "",
    flip_reason: "",
    player1Username: "",
  });
  const [player2HasJoined, setPlayer2HasJoined] = useState(false);
  const [player2Username, setPlayer2Username] = useState("");

  const isPlayerOne = Number(localStorage.getItem("is_player_one"));

  useEffect(() => {
    const fetchGameSession = async () => {
      try {
        const { data } = await http.post(`/FetchGameSession`, {
          gamecode,
        });
        setGame(data.game);
        if (data.game.player2Username) {
          setPlayer2HasJoined(true);
        }

        if (data.game.winner) {
          clearInterval(interval);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGameSession();
    const interval = setInterval(fetchGameSession, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const joinGameSession = async (event: FormEvent) => {
    try {
      event.preventDefault();
      await http.post("/JoinGameSession", {
        gamecode,
        player2Username,
      });
      setPlayer2HasJoined(true);
    } catch (error) {
      console.log(error);
    }
  };

  const renderGameStatus = () => {
    if (isPlayerOne) {
      if (!player2HasJoined) {
        return <Text>Waiting for other player</Text>;
      } else if (game.winner) {
        return (
          <Text>{game.winner === "player1" ? "You Win!" : "You Lose!"}</Text>
        );
      } else {
        return <Text>Coin flip in progress</Text>;
      }
    } else {
      if (player2HasJoined) {
        if (game.winner) {
          return (
            <Text>{game.winner === "player2" ? "You Win!" : "You Lose!"}</Text>
          );
        } else {
          return <Text>Coin flip in progress</Text>;
        }
      } else {
        return (
          <Flex justifyContent="center">
            <Grid
              width={{ base: "300px", md: "400px" }}
              onSubmit={joinGameSession}
              rowGap={4}
              as="form"
            >
              <FormControl>
                <FormLabel>Enter a username for this session</FormLabel>
                <Input
                  type="text"
                  required
                  name="player2Username"
                  value={player2Username}
                  onChange={({ target }) => setPlayer2Username(target.value)}
                />
              </FormControl>
              <Button type="submit">Join Game Session</Button>
            </Grid>
          </Flex>
        );
      }
    }
  };

  const playAgain = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <MainLayout>
      <Box mb={8}>
        <Text>
          Flipping coin to settle: <b>{game.flip_reason}</b>
        </Text>
        <Text>
          You are <b> {isPlayerOne ? "HEADS" : "TAILS"}</b>
        </Text>
      </Box>

      {renderGameStatus()}

      {game.winner && (
        <Box my={8}>
          <Button onClick={playAgain}>Play Again</Button>
        </Box>
      )}
    </MainLayout>
  );
};
