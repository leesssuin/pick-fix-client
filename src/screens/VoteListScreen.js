import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import PropTypes from "prop-types";

import { getVoteListApi } from "../util/api/vote";
import { userState } from "../states/userState";
import { voteState } from "../states/voteState";
import VoteList from "../components/List";
import MESSAGE from "../constants/message";
import SCREEN from "../constants/screen";

export default function VoteListScreen({ navigation }) {
  const user = useRecoilValue(userState);
  const [votes, setVotes] = useRecoilState(voteState);

  useEffect(() => {
    const getVoteList = async () => {
      try {
        const voteList = await getVoteListApi(user.userId);

        setVotes(voteList.data);
      } catch (err) {
        alert(MESSAGE.ERROR);
      }
    };

    getVoteList();
  }, []);

  const navigateVotePage = (voteId) => {
    Object.entries(votes).map(([id, plan]) => {
      if (voteId === id) {
        if (!plan.voting.length) {
          navigation.navigate(SCREEN.VOTE_SCREEN, { voteId: voteId });

          return;
        }

        const isNotVotedUser = plan.voting.every((votedPick) => {
          return votedPick.id !== user.userId;
        });

        if (isNotVotedUser) {
          navigation.navigate(SCREEN.VOTE_SCREEN, { voteId: voteId });

          return;
        }

        if (!isNotVotedUser) {
          navigation.navigate(SCREEN.VOTE_RESULT_SCREEN, { voteId: voteId });

          return;
        }
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.title}>Vote List</Text>
        </View>
        <ScrollView>
          <VoteList
            plans={votes}
            onClickPlan={navigateVotePage}
            dotColor="#f5ba6a"
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  mainTextContainer: {
    flex: 1,
    marginTop: "10%",
    paddingTop: 0,
  },
  title: {
    flex: 1,
    color: "#0a80ae",
    fontSize: 40,
  },
});

VoteListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
