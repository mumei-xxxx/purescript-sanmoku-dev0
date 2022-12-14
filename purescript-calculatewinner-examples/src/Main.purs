module Main where

import Prelude (class Eq, class Ord, class Show, bind, discard, pure, ($), (==), join)
import Control.Alternative (guard)
import Data.Array (all, head, (!!), find)
import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe(..), isJust)
import Data.Show.Generic (genericShow)

lines :: Array (Array Int)
lines =
  [ [ 0, 1, 2 ]
  , [ 3, 4, 5 ]
  , [ 6, 7, 8 ]
  , [ 0, 3, 6 ]
  , [ 1, 4, 7 ]
  , [ 2, 5, 8 ]
  , [ 0, 4, 8 ]
  , [ 2, 4, 6 ]
  ]

data SquareValueType = X | O

derive instance Eq SquareValueType
derive instance Ord SquareValueType
derive instance Generic SquareValueType _

instance Show SquareValueType where
  show = genericShow

type Board = Array (Maybe SquareValueType)

{-
  https://pursuit.purescript.org/packages/purescript-arrays/7.1.0/docs/Data.Array#v:all
-}

{-
  find https://pursuit.purescript.org/packages/purescript-arrays/7.1.0/docs/Data.Array#v:find
  isJust
  https://pursuit.purescript.org/packages/purescript-maybe/6.0.0/docs/Data.Maybe#v:isJust
-}


calculateWinner1 :: Board -> Maybe SquareValueType
calculateWinner1 boardArr =
  let
    -- | ある Line が同じ SquareValueType で埋まっているかどうか判定する
    isLineMatch :: Array Int -> SquareValueType -> Boolean
    isLineMatch line squareValue = all (\i -> boardArr !! i == Just (Just squareValue)) line

    -- | すべての Line, SquareValueType の組み合わせについて isLineMatch を評価する
    checked :: Array (Maybe SquareValueType)
    checked = do
      line <- lines
      squareValue <- [ X, O ]
      pure
        if isLineMatch line squareValue then
          Just squareValue
        else
          Nothing
  in
    -- | checked の中で一番最初に Just が出てきたものを返す
    -- | find で帰ってくるのは Maybe (Maybe SquareValueType) なので、join で一つ unwrap する
    join $ find isJust checked


calculateWinner2 :: Board -> Maybe SquareValueType
calculateWinner2 boardArr =
  let
    -- | ある Line が同じ SquareValueType で埋まっているかどうか判定する
    isLineMatch :: Array Int -> SquareValueType -> Boolean
    isLineMatch line squareValue = all (\i -> boardArr !! i == Just (Just squareValue)) line

    -- | すべての Line, SquareValueType の組み合わせについて isLineMatch を評価する
    -- | false ならそれはスキップする
    checked :: Array SquareValueType
    checked = do
      line <- lines
      squareValue <- [ X, O ]
      guard $ isLineMatch line squareValue
      pure squareValue
  in
    head checked

{-
  [X, O, Nothing, X, O, O, X, O, O]
  [Just X, Just O, Nothing, Just X, Just O, Just O, Just X, Just O, Just O]

  calculateWinner $ map Just [X, O, X, X, O, O, X, O, O]
(Just X)
-}
calculateWinner :: Board -> Maybe SquareValueType
calculateWinner boardArr = head do
  line <- lines
  squareValue <- [ X, O ]
  guard $ all (\i -> boardArr !! i == Just (Just squareValue)) line
  pure squareValue


