import {ResultCollection} from '../../db/collections/ResultCollection'

export const addResult = (data) => {
  const {points, player, mode} = data
  ResultCollection.insert({
    points,
    player,
    mode,
  })
}