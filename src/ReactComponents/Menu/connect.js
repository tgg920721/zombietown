import { connect } from "react-redux";
import { endTurn, conquer } from "../../actions";
import { getFoodGrowth } from "../../reducers";

const mapStateToProps = state => ({
  turn: state.turn,
  selectedTile: state.selectedTile,
  currentPopulation: state.population,
  maxPopulation: state.maxPopulation,
  food: state.foodAmount,
  foodGrowth: getFoodGrowth(state),
  showConquerButton:
    !state.selectedTile.taken && !state.selectedTile.conquerCounter
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    endTurnAction: () => dispatch(endTurn()),
    conquerAction: tile => dispatch(conquer(tile))
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
