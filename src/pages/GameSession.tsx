import { Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/Main";
interface IGameSessionProps {}

export const GameSession: FC<IGameSessionProps> = () => {
  const { gamecode } = useParams();
  const [countdownTimer, setCountdownTimer] = useState(3);

  // call the game in storage to know

  useEffect(() => {
    if (countdownTimer === 0) {
      // do stuff
    }
  }, [countdownTimer]);

  return (
    <MainLayout>
      {gamecode}

      <Text>Waiting for other player</Text>

      <Text>Flipping coin in {countdownTimer}</Text>
    </MainLayout>
  );
};
