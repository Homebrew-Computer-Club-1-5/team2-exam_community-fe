import { useState, useEffect } from "react";
import { updateProfile, getProfile } from "../../api";
import { useForm } from "react-hook-form";
import { LoginForm } from "../molecules/atoms/styled";
import TopBar from "../molecules/TopBar";
import Loading from "../molecules/Loading";
import { useRecoilState } from "recoil";
import { user } from "../../store/atoms";

interface IForm {
  age: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

function FixMyProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [skipCount, setSkipCount] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [userData, setUserData] = useState({
    age: "0",
    name: "default",
    email: "default",
    phone: "default",
    gender: "default",
  });
  const [userName, setUserName] = useRecoilState(user);

  function onSubmit(data: IForm) {
    setUserData((state) => ({
      age: data.age,
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
    }));
  }

  useEffect(() => {
    if (skipCount === 0) {
      const getUserInfo = async () => {
        const userProfile = await getProfile();
        setUserData({
          age: userProfile.age?.toString(),
          name: userProfile.name,
          email: userProfile.email,
          phone: userProfile.phone,
          gender: userProfile.gender,
        });
        setSkipCount(1);
        setisLoading(false);
        console.log("useEffect 1 userData :", userData);
      };
      getUserInfo();
    } else if (skipCount === 1) {
      setSkipCount(2);
    } else {
      if (window.confirm("정말 수정합니까")) {
        updateProfile(userData);
        setUserName(userData.name);
        alert("수정 성공");
        window.location.href = "/myprofile";
      } else {
        alert("수정 취소");
      }
    }
  }, [userData]);

  return !isLoading ? (
    <>
      <TopBar needWrite={false} needSearch={false} />
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <label>닉네임</label>
        <input
          {...register("name", {
            required: "이름을 입력해주세요",
          })}
          type="name"
          name="name"
          defaultValue={`${userData.name}`}
        />
        <span className="errorMessage">{errors?.name?.message}</span>
        <br />
        <label>공부한 기간</label>
        <input
          {...register("age", {
            required: "공부한 기간 입력해주세요",
          })}
          name="age"
          type="age"
          defaultValue={`${userData.age}`}
        />
        <span className="errorMessage">{errors?.age?.message}</span>

        <br />
        <label>이메일</label>
        <input
          {...register("email", {
            required: "이메일을 입력해주세요",
          })}
          type="text"
          name="email"
          defaultValue={`${userData.email}`}
        />
        <span className="errorMessage">{errors?.email?.message}</span>
        <br />
        <label>전화번호</label>
        <input
          {...register("phone", {
            required: "전화번호를 입력해주세요",
          })}
          type="text"
          name="phone"
          defaultValue={`${userData.phone}`}
        />
        <span className="errorMessage">{errors?.phone?.message}</span>
        <br />
        <label>성별</label>
        <input
          {...register("gender", {
            required: "성별을 입력해주세요",
          })}
          type="text"
          name="gender"
          defaultValue={`${userData.gender}`}
        />
        <span className="errorMessage">{errors?.gender?.message}</span>
        <br />
        <button type="submit">수정하기</button>
      </LoginForm>
    </>
  ) : (
    <Loading />
  );
}

export default FixMyProfile;
