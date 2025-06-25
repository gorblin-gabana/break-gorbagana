import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import PixelGridCanvas from "components/PixelGridCanvas";
import {
  useTps,
  useCreatedCount,
  useAvgConfirmationTime,
} from "providers/transactions";
import { useWalletState } from "providers/wallet";
import { useActiveUsers } from "providers/server/socket";
import { useGameState } from "providers/game";

export function GamePage() {
  const gameState = useGameState();
  const gameStatus = gameState.status;
  const countdownStart = gameState.countdownStartTime;
  const showSetup = gameStatus === "setup";
  const showStats = gameStatus === "play" || countdownStart !== undefined;
  const payer = useWalletState().wallet;
  const location = useLocation();
  const navigate = useNavigate();

  if (showSetup) {
    if (!payer) {
      navigate("/wallet");
      return null;
    } else {
      navigate("/start");
      return null;
    }
  }

  function handleMint(pixels: number[][]) {
    // TODO: send pixel data to backend for NFT minting
    alert("Minting NFT with your pixel art! (Backend integration needed)");
  }

  return (
    <div className="container-fluid d-flex flex-fill flex-column my-4 min-width-0">
      {showStats && <Stats />}
      <div className="row flex-grow-1 justify-content-center align-items-center">
        <div className="col-md-8 d-flex justify-content-end">
          {/* Right panel: Pixel grid game */}
          <PixelGridCanvas onMint={handleMint} />
        </div>
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
          {/* Left panel: Color picker and pen */}
          {/* The color picker is now part of PixelGridCanvas for simplicity */}
        </div>
      </div>
    </div>
  );
}

export function EmptyCard() {
  return (
    <div className="card mb-0 h-100">
      <div className="card-header"></div>
      <div className="card-body"></div>
    </div>
  );
}

function Stats() {
  const createdCount = useCreatedCount();
  const avgConfTime = useAvgConfirmationTime().toFixed(2);
  const tps = useTps();
  const activeUsers = useActiveUsers();

  return (
    <div className="row">
      <StatCard label="Transactions Sent" value={createdCount} icon="send" />
      <StatCard
        label="Avg. Confirmation Time"
        value={`${avgConfTime}s`}
        icon="clock"
      />
      <StatCard label="Players Online" value={activeUsers} icon="user" />
      <StatCard label="Transactions per Second" value={tps} icon="zap" />
    </div>
  );
}

type StatProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  icon: string;
};
function StatCard({ label, value, icon }: StatProps) {
  return (
    <div className="stat-card col-6 col-lg-3 d-flex flex-column">
      <div className="card flex-grow-1">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-12 col-md-9">
              <h6 className="text-uppercase text-truncate mb-2">{label}</h6>
              <span className="h2 mb-0 text-primary">{value}</span>
            </div>
            <div className="col-md-3 d-none d-md-block text-right">
              <span className={`h2 fe fe-${icon} text-primary mb-0`}></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
