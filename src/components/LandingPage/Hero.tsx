import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="relative w-full h-[100vh] flex flex-col items-center justify-center"
      // style={{
      //   backgroundImage: "url('/Images/hero.svg')",
      //   backgroundSize: "cover",
      // }}
    >
      <img
        src="/Images/BatikRangRang.png"
        alt="Batik RangRang"
        className="w-full object-contain absolute top-0 lg:-top-[100px] left-0 opacity-50 lg:opacity-50 rotate-180"
      />
      <img
        src="/Images/BatikRangRang.png"
        alt="Batik RangRang"
        className="w-full object-contain absolute bottom-0 lg:-bottom-[100px] left-0 opacity-50 lg:opacity-50"
      />
      <img
        src="/Images/Side Right.png"
        alt="Side"
        className="w-[75px] lg:w-[300px] object-contain absolute top-[40vh] right-[20px]"
      />
      <img
        src="/Images/Side.png"
        alt="Side"
        className="w-[75px] lg:w-[300px] object-contain absolute top-[40vh] left-[20px]"
      />
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-secondary to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-b to-secondary from-transparent"></div>
      <div className=" flex flex-col items-center">
        <p
          className="font-sirukota text-base lg:text-4xl text-primary"
          style={{
            textShadow:
              "rgb(242, 229, 221) 10px 0px 0px, rgb(242, 229, 221) 9.95004px 0.998334px 0px, rgb(242, 229, 221) 9.80067px 1.98669px 0px, rgb(242, 229, 221) 9.55336px 2.9552px 0px, rgb(242, 229, 221) 9.21061px 3.89418px 0px, rgb(242, 229, 221) 8.77583px 4.79426px 0px, rgb(242, 229, 221) 8.25336px 5.64642px 0px, rgb(242, 229, 221) 7.64842px 6.44218px 0px, rgb(242, 229, 221) 6.96707px 7.17356px 0px, rgb(242, 229, 221) 6.2161px 7.83327px 0px, rgb(242, 229, 221) 5.40302px 8.41471px 0px, rgb(242, 229, 221) 4.53596px 8.91207px 0px, rgb(242, 229, 221) 3.62358px 9.32039px 0px, rgb(242, 229, 221) 2.67499px 9.63558px 0px, rgb(242, 229, 221) 1.69967px 9.8545px 0px, rgb(242, 229, 221) 0.707372px 9.97495px 0px, rgb(242, 229, 221) -0.291995px 9.99574px 0px, rgb(242, 229, 221) -1.28844px 9.91665px 0px, rgb(242, 229, 221) -2.27202px 9.73848px 0px, rgb(242, 229, 221) -3.2329px 9.463px 0px, rgb(242, 229, 221) -4.16147px 9.09297px 0px, rgb(242, 229, 221) -5.04846px 8.63209px 0px, rgb(242, 229, 221) -5.88501px 8.08496px 0px, rgb(242, 229, 221) -6.66276px 7.45705px 0px, rgb(242, 229, 221) -7.37394px 6.75463px 0px, rgb(242, 229, 221) -8.01144px 5.98472px 0px, rgb(242, 229, 221) -8.56889px 5.15501px 0px, rgb(242, 229, 221) -9.04072px 4.2738px 0px, rgb(242, 229, 221) -9.42222px 3.34988px 0px, rgb(242, 229, 221) -9.70958px 2.39249px 0px, rgb(242, 229, 221) -9.89993px 1.4112px 0px, rgb(242, 229, 221) -9.99135px 0.415807px 0px, rgb(242, 229, 221) -9.98295px -0.583741px 0px, rgb(242, 229, 221) -9.8748px -1.57746px 0px, rgb(242, 229, 221) -9.66798px -2.55541px 0px, rgb(242, 229, 221) -9.36457px -3.50783px 0px, rgb(242, 229, 221) -8.96758px -4.4252px 0px, rgb(242, 229, 221) -8.481px -5.29836px 0px, rgb(242, 229, 221) -7.90968px -6.11858px 0px, rgb(242, 229, 221) -7.25932px -6.87766px 0px, rgb(242, 229, 221) -6.53644px -7.56803px 0px, rgb(242, 229, 221) -5.74824px -8.18277px 0px, rgb(242, 229, 221) -4.90261px -8.71576px 0px, rgb(242, 229, 221) -4.00799px -9.16166px 0px, rgb(242, 229, 221) -3.07333px -9.51602px 0px, rgb(242, 229, 221) -2.10796px -9.7753px 0px, rgb(242, 229, 221) -1.12153px -9.93691px 0px, rgb(242, 229, 221) -0.123887px -9.99923px 0px, rgb(242, 229, 221) 0.87499px -9.96165px 0px, rgb(242, 229, 221) 1.86512px -9.82453px 0px, rgb(242, 229, 221) 2.83662px -9.58924px 0px, rgb(242, 229, 221) 3.77978px -9.25815px 0px, rgb(242, 229, 221) 4.68517px -8.83455px 0px, rgb(242, 229, 221) 5.54374px -8.32267px 0px, rgb(242, 229, 221) 6.34693px -7.72764px 0px, rgb(242, 229, 221) 7.0867px -7.0554px 0px, rgb(242, 229, 221) 7.75566px -6.31267px 0px, rgb(242, 229, 221) 8.34713px -5.50686px 0px, rgb(242, 229, 221) 8.8552px -4.64602px 0px, rgb(242, 229, 221) 9.27478px -3.73877px 0px, rgb(242, 229, 221) 9.6017px -2.79415px 0px, rgb(242, 229, 221) 9.83268px -1.82162px 0px, rgb(242, 229, 221) 9.96542px -0.830894px 0px",
          }}
        >
          Welcome to Nusa Penida
        </p>
        <p
          className="font-sirukota text-[36px] lg:text-[100px] text-[#D7713E] mt-0 lg:-mt-[20px]"
          style={{
            textShadow:
              "rgb(248, 240, 236) 10px 0px 0px, rgb(248, 240, 236) 9.95004px 0.998334px 0px, rgb(248, 240, 236) 9.80067px 1.98669px 0px, rgb(248, 240, 236) 9.55336px 2.9552px 0px, rgb(248, 240, 236) 9.21061px 3.89418px 0px, rgb(248, 240, 236) 8.77583px 4.79426px 0px, rgb(248, 240, 236) 8.25336px 5.64642px 0px, rgb(248, 240, 236) 7.64842px 6.44218px 0px, rgb(248, 240, 236) 6.96707px 7.17356px 0px, rgb(248, 240, 236) 6.2161px 7.83327px 0px, rgb(248, 240, 236) 5.40302px 8.41471px 0px, rgb(248, 240, 236) 4.53596px 8.91207px 0px, rgb(248, 240, 236) 3.62358px 9.32039px 0px, rgb(248, 240, 236) 2.67499px 9.63558px 0px, rgb(248, 240, 236) 1.69967px 9.8545px 0px, rgb(248, 240, 236) 0.707372px 9.97495px 0px, rgb(248, 240, 236) -0.291995px 9.99574px 0px, rgb(248, 240, 236) -1.28844px 9.91665px 0px, rgb(248, 240, 236) -2.27202px 9.73848px 0px, rgb(248, 240, 236) -3.2329px 9.463px 0px, rgb(248, 240, 236) -4.16147px 9.09297px 0px, rgb(248, 240, 236) -5.04846px 8.63209px 0px, rgb(248, 240, 236) -5.88501px 8.08496px 0px, rgb(248, 240, 236) -6.66276px 7.45705px 0px, rgb(248, 240, 236) -7.37394px 6.75463px 0px, rgb(248, 240, 236) -8.01144px 5.98472px 0px, rgb(248, 240, 236) -8.56889px 5.15501px 0px, rgb(248, 240, 236) -9.04072px 4.2738px 0px, rgb(248, 240, 236) -9.42222px 3.34988px 0px, rgb(248, 240, 236) -9.70958px 2.39249px 0px, rgb(248, 240, 236) -9.89993px 1.4112px 0px, rgb(248, 240, 236) -9.99135px 0.415807px 0px, rgb(248, 240, 236) -9.98295px -0.583741px 0px, rgb(248, 240, 236) -9.8748px -1.57746px 0px, rgb(248, 240, 236) -9.66798px -2.55541px 0px, rgb(248, 240, 236) -9.36457px -3.50783px 0px, rgb(248, 240, 236) -8.96758px -4.4252px 0px, rgb(248, 240, 236) -8.481px -5.29836px 0px, rgb(248, 240, 236) -7.90968px -6.11858px 0px, rgb(248, 240, 236) -7.25932px -6.87766px 0px, rgb(248, 240, 236) -6.53644px -7.56803px 0px, rgb(248, 240, 236) -5.74824px -8.18277px 0px, rgb(248, 240, 236) -4.90261px -8.71576px 0px, rgb(248, 240, 236) -4.00799px -9.16166px 0px, rgb(248, 240, 236) -3.07333px -9.51602px 0px, rgb(248, 240, 236) -2.10796px -9.7753px 0px, rgb(248, 240, 236) -1.12153px -9.93691px 0px, rgb(248, 240, 236) -0.123887px -9.99923px 0px, rgb(248, 240, 236) 0.87499px -9.96165px 0px, rgb(248, 240, 236) 1.86512px -9.82453px 0px, rgb(248, 240, 236) 2.83662px -9.58924px 0px, rgb(248, 240, 236) 3.77978px -9.25815px 0px, rgb(248, 240, 236) 4.68517px -8.83455px 0px, rgb(248, 240, 236) 5.54374px -8.32267px 0px, rgb(248, 240, 236) 6.34693px -7.72764px 0px, rgb(248, 240, 236) 7.0867px -7.0554px 0px, rgb(248, 240, 236) 7.75566px -6.31267px 0px, rgb(248, 240, 236) 8.34713px -5.50686px 0px, rgb(248, 240, 236) 8.8552px -4.64602px 0px, rgb(248, 240, 236) 9.27478px -3.73877px 0px, rgb(248, 240, 236) 9.6017px -2.79415px 0px, rgb(248, 240, 236) 9.83268px -1.82162px 0px, rgb(248, 240, 236) 9.96542px -0.830894px 0px",
          }}
        >
          Report Center
        </p>
      </div>
      <div className="z-[1000] bg-white rounded-xl p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <p className="text-center font-poppins mb-5 font-bold">Get Started</p>
        <div className="flex gap-5">
          <Link href="/auth/login">
            <Button className="bg-[#D7713E] hover:bg-primary cursor-pointer">
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-[#D7713E] hover:bg-primary cursor-pointer">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
