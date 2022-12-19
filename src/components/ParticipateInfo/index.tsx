import React from "react";
import { type Participants } from "../../../types/typing";

interface Props {
  participants?: Participants[];
  loading?: boolean;
}

const ParticipateInfo = ({ participants, loading }: Props) => {
  return (
    <div className="flex-2 flex flex-col items-center space-y-6 py-2 text-center lg:justify-center lg:space-y-0">
      <div className="text-2xl text-white">
        Participants : {participants?.length}
      </div>
      <div className="py-5 text-white">
        {loading ? (
          <div className="animate-pulse">Fetching data</div>
        ) : participants ? (
          participants.map((participant, id) => (
            <div key={id}>{participant.name}</div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default ParticipateInfo;
