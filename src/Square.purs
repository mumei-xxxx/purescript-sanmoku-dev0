module Square where

import Prelude

import Data.Foldable (traverse_)
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Jelly.Aff (awaitBody)
import Jelly.Component (class Component, rawSig, text, textSig)
import Jelly.Element as JE
import Jelly.Hooks (runHooks_)
import Jelly.Hydrate (mount)
import Jelly.Prop ((:=))
import Jelly.Signal (Signal)

-- type SquarePropsType m =
--   { value :: Signal SquareValueType
--   , onClick :: m Unit
--   }

-- squareComponent :: forall m. Component m => SquarePropsType m -> m Unit
-- squareComponent { value, onClick } = do
--   JE.button [ "class" := "square", onClick \_ -> onClick ] do
--     textSig value

type SquarePropsType m =
  { value :: Signal Int }

squareComponent :: forall m. Component m => SquarePropsType m -> m Unit
squareComponent { value } = do
  JE.button [ "class" := "square" ] do
    textSig $ show <$> value