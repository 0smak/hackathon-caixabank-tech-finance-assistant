import { profilerData } from "./profilerData";

export function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) {
  const interactionArray = interactions ? Array.from(interactions) : [];

  profilerData.push({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions: interactionArray,
  });
}

export function testOnRenderCallback() {
  profilerData.length = 0;

  const mockData = {
    id: "test-id",
    phase: "update",
    actualDuration: 50,
    baseDuration: 40,
    startTime: 100,
    commitTime: 150,
    interactions: new Set(["interaction1", "interaction2"]),
  };

  onRenderCallback(
    mockData.id,
    mockData.phase,
    mockData.actualDuration,
    mockData.baseDuration,
    mockData.startTime,
    mockData.commitTime,
    mockData.interactions
  );

  console.assert(
    profilerData.length === 1,
    "No performance data was captured."
  );
  console.assert(profilerData[0].id === mockData.id, "ID does not match.");
  console.assert(
    profilerData[0].phase === mockData.phase,
    "Phase does not match."
  );
  console.assert(
    profilerData[0].actualDuration === mockData.actualDuration,
    "Actual duration does not match."
  );
  console.assert(
    profilerData[0].baseDuration === mockData.baseDuration,
    "Base duration does not match."
  );
  console.assert(
    profilerData[0].startTime === mockData.startTime,
    "Start time does not match."
  );
  console.assert(
    profilerData[0].commitTime === mockData.commitTime,
    "Commit time does not match."
  );
  console.assert(
    profilerData[0].interactions.length === 2,
    "Interactions were not captured correctly."
  );
}

testOnRenderCallback();
