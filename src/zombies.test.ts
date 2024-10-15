import { deepEqual, strictEqual } from "node:assert";
import { ok } from "node:assert/strict";
import { test } from "node:test";

const createRoom = (capacity: number) => {
  const _capacity = capacity;
  let zombies = 0;

  return {
    CheckIfRoomFull: () => zombies >= capacity,

    getZombieCount: () => zombies,

    addZombie: () => {
      if (zombies < _capacity) {
        zombies++;
      }
    },
  };
};

test("room is full", () => {
  const room = createRoom(0);

  const isRoomFull = room.CheckIfRoomFull();

  ok(isRoomFull);
});

test("room with no capacity cannot fit any zombies", () => {
  const room = createRoom(0);

  room.addZombie();

  deepEqual(room.getZombieCount(), 0);
});

test("empty room that fits one zombie is not full", () => {
  const room = createRoom(1);

  const isRoomFull = room.CheckIfRoomFull();

  ok(!isRoomFull);
});

test("one-roomer becomes full when a zombie is added", () => {
  const room = createRoom(1);

  room.addZombie();

  const isRoomFull = room.CheckIfRoomFull();

  ok(isRoomFull);
});

test("two-roomer is not full when a zombie is added", () => {
  const room = createRoom(2);

  room.addZombie();

  const isRoomFull = room.CheckIfRoomFull();

  ok(!isRoomFull);
});

test("second zombie consumes first zombie when added to a one-roomer", () => {
  const room = createRoom(1);

  room.addZombie();

  room.addZombie();

  deepEqual(room.getZombieCount(), 1);
});

// You are free to add more tests that you think are relevant!
