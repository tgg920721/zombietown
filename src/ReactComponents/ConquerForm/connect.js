import { connect } from "react-redux";
import {
  clearSelectedPeople,
  conquer,
  setConquerFormError,
  toggleForm
} from "../../actions";

const getSelectedPeople = state => {
  const selectedPeopleIds = state.ui.conquerFormState.selectedPeople;
  const selectedPeople = selectedPeopleIds.map(id =>
    state.people.find(person => id === person.id)
  );

  return selectedPeople;
};

const getSuccessPropability = people => {
  if (people.length < 1) return 0;
  if (people.length >= 3) return 100;

  return people.length * 33.33;
};

const mapStateToProps = state => {
  const people = getSelectedPeople(state);

  return {
    conquerCounter: state.selectedTile.conquerCounter,
    display: state.displayConquerForm,
    error: state.ui.conquerFormState.error,
    selectedTile: state.selectedTile,
    selectedPeople: people,
    successProbability: getSuccessPropability(people)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    conquerAction: (tile, people, conquerCounter) => {
      if (people.length < 1) {
        return dispatch(setConquerFormError("No people selected"));
      } else {
        return (
          dispatch(setConquerFormError(undefined)) &&
          dispatch(clearSelectedPeople()) &&
          dispatch(conquer(tile, people, conquerCounter)) &&
          dispatch(toggleForm())
        );
      }
    },
    toggleFormAction: () =>
      dispatch(setConquerFormError(undefined)) && dispatch(toggleForm())
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
