import { Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/Main";
import http from "../services/http";
interface IGameSessionProps {}

export const GameSession: FC<IGameSessionProps> = () => {
  const { gamecode } = useParams();
  const [countdownTimer, setCountdownTimer] = useState(3);

  // call the game in storage to know
  useEffect(() => {
    http.get("/FetchGameSession");
  }, []);

  useEffect(() => {
    if (countdownTimer === 0) {
      // do stuff
    }
  }, [countdownTimer]);

  return (
    <MainLayout>
      {gamecode}

      <Text>Waiting for other player</Text>
    </MainLayout>
  );
};
