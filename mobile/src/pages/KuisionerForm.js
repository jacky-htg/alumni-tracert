import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button} from 'react-native-elements';
import {getQuestionList} from '../utils/actions';
import InputBorderer from '../components/InputBorderer';
import CheckBoxClear from '../components/CheckBoxClear';
import storage from '../utils/storage';
import {userAnswerCall, tracerCreateCall} from '../utils/actions';

const KuisionerForm = ({navigation}) => {
  const [groups, setGroups] = useState([1]);
  const [tracerId, setTracerId] = useState(null);
  const dispatch = useDispatch();
  const {isLogin, questionList} = useSelector(state => ({
    isLogin: state.isLogin,
    questionList: state.questionList,
  }));
  const [userAnswer, setUserAnswer] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getQuestionList(groups));
  }, []);

  useEffect(() => {
    if (questionList && questionList.length > 0) {
      console.log('questionList', questionList);
    }
  }, [questionList]);

  const changeAnswer = (value, questionId, answerTitle, isMultiple) => {
    console.log(userAnswer);
    console.log('questionList', questionList);
    const answer = {
      id: value,
      text: answerTitle,
    };
    if (isMultiple) {
      if (!userAnswer[questionId]) {
        let temp = [];
        temp.push(answerTitle);
        // userAnswer[questionId] = temp;
        let ans = userAnswer;
        ans[questionId] = temp;
        setUserAnswer(ans);
      } else {
        let temp = userAnswer[questionId];
        let value = answerTitle;
        // let isChecked = event.target.checked;
        if (temp.indexOf(answerTitle) === -1) {
          temp.push(answerTitle);
        } else {
          temp.splice(temp.indexOf(answerTitle), 1);
        }
        // userAnswer[questionId] = temp;
        let ans = userAnswer;
        ans[questionId] = temp;
        setUserAnswer(ans);
      }
    } else {
      // console.log(questionId, event.target.value)
      let ans = userAnswer;
      ans[questionId] = answer;
      setUserAnswer(ans);
    }
    setReRender(!reRender);
    console.log('userAnswer', userAnswer);
  };

  const isCheckedRadio = (question, questionOption) => {
    let flag = false;

    if (userAnswer[question.id] && userAnswer[question.id].id) {
      flag = userAnswer[question.id].id == questionOption.id;
    }

    return flag;
  };

  const renderAnswerByType = question => {
    switch (question.questionType) {
      case 1:
        return (
          <InputBorderer label="Instansi" onChangeText={e => console.log(e)} />
        );
      case 2:
        return (
          <>
            {question.questionOptionList.length > 0 &&
              question.questionOptionList.map((opt, idx) => {
                return (
                  <CheckBoxClear
                    key={opt.id || idx}
                    title={opt.title}
                    // checked={true}
                    checked={isCheckedRadio(question, opt)}
                    onPress={() => changeAnswer(opt.id, question.id, opt.title)}
                    // checked={statusALumni === 'alumni'}
                    // onPress={() => setStatusAlumni('alumni')}
                  />
                );
              })}
          </>
        );
      case 3:
        return (
          <View>
            <Text>TIPE 3</Text>
          </View>
        );
    }
  };

  const validateAnswer = () => {
    let result = true;
    questionList.forEach(group => {
      console.log('group', group);
      group.questionList.forEach(question => {
        console.log(question.id, userAnswer[question.id]);
        if (!userAnswer[question.id]) {
          result = false;
        }
      });
    });
    return result;
  };

  const lanjutkan = async () => {
    setIsLoading(true);
    try {
      if (!validateAnswer()) {
        console.log('userAnswer', userAnswer);
        throw {message: 'silahkan jawab kuisioner terlebih dahulu'};
      }

      if (!tracerId) {
        dispatch(tracerCreateCall());
        // setTracerId(tracerResponse.id);
        // console.log('tracerResponse', tracerResponse);
      }

      // const answer = dispatch(userAnswerCall(userAnswer, tracerId));
      // console.log('answer', answer);
      // console.log('groups', groups);
      // if (groups.length === 1 && groups[0] === 1) {
      //   console.log('userAnswer', userAnswer);
      //   if (userAnswer[1].id !== 5) {
      //     setGroups([parseInt(userAnswer[1].id) + 1]);
      //   }
      //   dispatch(getQuestionList(groups));
      // } else {
      //   const token = await storage.load({key: 'token'});
      //   if (token.usertype == 2) {
      //     // navigate(PATH_URL.DASHBOARD, {replace: true});
      //   } else {
      //     // navigate(PATH_URL.UPLOAD_IJAZAH, {replace: true});
      //   }
      // }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log('e', e);
      // errorServiceHandling(e);
      // if (Cookies.get('token') == null) {
      //   location = PATH_URL.LOGIN;
      // }
      // notifications.danger(e.message);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          backgroundColor: '#ffffff',
        }}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>
          KUISIONER TRACER STUDY/PENGGUNA ALUMNI
        </Text>
        <View style={{paddingTop: 24}}>
          {questionList.length > 0 &&
            questionList.map((group, idx) => {
              return (
                <View key={group.id || idx}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#3B82F6',
                      fontWeight: 'bold',
                      marginBottom: 24,
                    }}>
                    {group.title}
                  </Text>
                  {group.questionList.length > 0 &&
                    group.questionList.map((quest, id) => {
                      return (
                        <View key={quest.id || id}>
                          <Text style={{fontWeight: 'bold', fontSize: 16}}>
                            {quest.title}
                          </Text>
                          {reRender
                            ? renderAnswerByType(quest)
                            : renderAnswerByType(quest)}
                        </View>
                      );
                    })}
                </View>
              );
            })}
        </View>
        <Button
          title="Lanjutkan"
          buttonStyle={{
            backgroundColor: '#047857',
            marginTop: 24,
          }}
          loading={isLoading}
          onPress={lanjutkan}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default KuisionerForm;
