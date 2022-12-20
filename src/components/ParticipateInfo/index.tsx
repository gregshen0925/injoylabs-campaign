import React from "react";
import { type Participants } from "../../../types/typing";

interface Props {
  participants?: Participants[];
}

const ParticipateInfo = ({ participants }: Props) => {
  return (
    <div className="flex-2 flex flex-col items-center space-y-6 py-2 text-center lg:justify-center lg:space-y-0">
      <div className="text-2xl text-white">
        Participants : {participants?.length}
      </div>
      <div className="py-5 text-white">
        {participants ? (
          participants.map((participant, id) => (
            <div key={id}>{participant.name}</div>
          ))
        ) : (
          <div className="animate-pulse">Fetching data</div>
        )}
      </div>
    </div>
  );
};

export default ParticipateInfo;
