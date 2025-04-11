"use client";

import FireflyEffect from "@/components/FireflyEffect";
import LightStick from "@/components/LightStick";
import TypoLogo from "@/components/TypoLogo";
import { cn } from "@/lib/utils/cn";
import { gsap, ScrollTrigger } from "@/lib/utils/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";

const members = [
  {
    name: "Jennie",
    image: "jennie03.jpg",
  },
  {
    name: "Jisoo",
    image: "jisoo.webp",
  },
  {
    name: "Rosie",
    image: "rosie.webp",
  },
  {
    name: "Lisa",
    image: "lisa02.webp",
  },
];

const albums = [
  {
    image: "blackpink-album-thealbum.jpg",
  },
  {
    image: "blackpink-album-squareup.jpg",
  },
  {
    image: "blackpink-album-squaretwo_2.jpg",
  },
  {
    image: "blackpink-album-squareone.jpg",
  },
  {
    image: "blackpink-album-pinkvenom.jpg",
  },
  {
    image: "blackpink-album-icecream.jpg",
  },
  {
    image: "blackpink-album-killthislove.jpg",
  },
  {
    image: "blackpink-album-howyoulikethat.jpg",
  },
  {
    image: "blackpink-album-bornpink.jpg",
  },
  {
    image: "blackpink-album-asifitsyourlast.jpg",
  },
];

const awards = [
  {
    date: "2023 02",
    award: "제12회 써클차트 뮤직 어워즈",
    category:
      "올해의 여자 그룹상, 디지털음원부문 올해의 가수상 9월, 디지털음원부문 올해의 가수상 8월, 뮤빗 글로벌초이스상 여자부문",
  },
  {
    date: "2023 01",
    award: "제 37회 골든디스크 어워즈",
    category: "음반부문 본상",
  },
  {
    date: "2023 01",
    award: "제32회 서울가요대상",
    category: "본상",
  },
  {
    date: "2022 12",
    award: "TIME",
    category: "올해의 엔터테이너",
  },
  {
    date: "2022 11",
    award: "MTV 비디오 뮤직 어워즈 EMA 독일",
    category: "BEST METAVERSE PERFORMANCE",
  },
  {
    date: "2022 11",
    award: "제 14회 엠넷 아시안 뮤직 어워드",
    category:
      "월드와이드 팬스 초이스 TOP 10, 베스트 뮤직비디오 상, 베스트 여자 그룹상",
  },
  {
    date: "2021 01",
    award: "제 35회 골든디스크 어워즈",
    category: "음반 본상, 디지털 음원 본상",
  },
  {
    date: "2018 01",
    award: "제 27회 서울가요대상",
    category: "본상",
  },
];

function page() {
  const size = "20vw";
  const count = albums.length - 1;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const section01Ref = useRef<HTMLDivElement | null>(null);
  const section02Ref = useRef<HTMLDivElement | null>(null);
  const section03Ref = useRef<HTMLDivElement | null>(null);
  const section04Ref = useRef<HTMLDivElement | null>(null);
  const section05Ref = useRef<HTMLDivElement | null>(null);
  const section06Ref = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  const title02Ref = useRef<HTMLDivElement | null>(null);
  const text02Ref = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const title04Ref = useRef<HTMLDivElement | null>(null);
  const text04Ref = useRef<HTMLDivElement | null>(null);

  const progressBar = useRef<HTMLDivElement | null>(null);

  const itemRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // section 01
    ScrollTrigger.create({
      trigger: section01Ref.current,
      start: "top top",
      endTrigger: section02Ref.current,
      markers: true,
    });

    // section 02
    gsap.to(titleRef.current, {
      color: "#f7a7bb",
      scrollTrigger: {
        trigger: section02Ref.current,
        pin: titleRef.current,
        end: "bottom center",
        scrub: true,
      },
    });

    // section 03
    // const tl = gsap.timeline();

    gsap.to(title02Ref.current, {
      y: -80,
      scrollTrigger: {
        trigger: title02Ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(text02Ref.current, {
      y: -400,
      scrollTrigger: {
        trigger: title02Ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    if (listRef.current) {
      gsap.to(listRef.current, {
        x: -(
          listRef.current?.scrollWidth -
          listRef.current?.getBoundingClientRect().width
        ),
        scrollTrigger: {
          trigger: listRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: section03Ref.current,
        pin: true,
        start: "bottom bottom",
      });
    }

    // section 04
    const tl = gsap.timeline();

    tl.to(title04Ref.current, {
      scale: 2.5,
    }).fromTo(
      text04Ref.current,
      {
        scale: 0,
        opacity: 0,
      },
      {
        opacity: 1,
        scale: 20,
      },
      "<",
    );

    ScrollTrigger.create({
      trigger: section04Ref.current,
      start: "top+=500 top",
      end: "+=4000",
      animation: tl,
      scrub: true,
    });

    ScrollTrigger.create({
      trigger: section04Ref.current,
      pin: true,
      start: "top top",
      end: "+=4000",
    });

    // section 05

    itemRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        {
          x: "100%",
          y: "100%",
          z: -300,
          // visibility: "hidden",
          scale: 0,
          rotateY: 90,
        },
        {
          x: 0,
          y: 0,
          z: 0,
          // visibility: "visible",
          scale: 1,
          rotateY: 0,
          ease: "expo.out",
          duration: 0.5,
          scrollTrigger: {
            trigger: section05Ref.current,
            start: `top+=${i * 500} top`,
            end: "max",
            endTrigger: section06Ref.current,
            toggleActions: "play none play reverse",
            markers: true,
          },
        },
      );
    });

    ScrollTrigger.create({
      trigger: section05Ref.current,
      pin: true,
      start: "top top",
      end: "+=4500",
    });

    // progress bar

    gsap.to(progressBar.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  const zoom = (el: HTMLDivElement) => {
    gsap.to(el, {
      scale: 10,
      zIndex: 10,
      rotateY: -360,
    });
  };

  return (
    <div className="relative overflow-hidden bg-black" ref={containerRef}>
      <div className="fixed top-0 left-0 z-[100] h-[4px] w-full">
        <span
          className="bg-primary block h-[inherit] w-0"
          ref={progressBar}
        ></span>
      </div>
      <LightStick />
      <FireflyEffect />
      <section
        className="relative flex h-lvh items-center justify-center p-[2vw] text-white"
        ref={section01Ref}
      >
        <TypoLogo />
      </section>
      <section
        className="relative flex min-h-lvh items-center justify-center py-40 text-white"
        ref={section02Ref}
      >
        <div className="container flex items-start justify-between gap-x-10 text-[70px]">
          <div className="w-1/2">
            <div className="font-oswald leading-none" ref={titleRef}>
              Awards &<br />
              Archievements
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-y-10 text-[20px]">
            {awards.map((award, i) => (
              <div key={i}>
                <span className="text-primary font-bold">{award.date}</span>
                <p>{award.award}</p>
                <span className="text-sm text-gray-400">
                  [{award.category}]
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="relative flex min-h-lvh items-center justify-between overflow-x-hidden py-[100px] text-white"
        ref={section03Ref}
      >
        <div className="container">
          <div className="flex items-center justify-between text-[70px]">
            <div className="border-primary w-1/2 border-l-4 pt-[80px] pl-10 uppercase">
              <div className="leading-none" ref={title02Ref}>
                BLACK PINK
                <br />
                Members
              </div>
            </div>
            <div className="mt-[600px] w-1/2 text-[20px]">
              <div ref={text02Ref}>
                BLACKPINK라는 그룹명은 가장 예쁜 색으로 표현되는 "핑크"를
                "블랙"으로 부정하는 의미를 덧붙여 ‘예쁘게만 보지 마라’, ‘보이는
                게 다가 아니다’라는 반전 의미를 담고 있다고 한다. 발표하는
                노래들 역시 팀명의 의미와 부합하는 곡들이 많다.
              </div>
            </div>
          </div>
          <div
            className="mt-[50px] ml-[400px] flex flex-nowrap gap-x-10"
            ref={listRef}
          >
            {members.map((member, i) => (
              <div
                className="text-blac relative flex size-[600px] shrink-0 bg-black"
                key={i}
              >
                <Image
                  src={`/assets/images/${member.image}`}
                  fill
                  alt=""
                  className="object-cover opacity-60"
                />
                <span className="absolute bottom-0 left-0 w-full flex-1 place-content-end place-items-end p-10 text-[80px]">
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="min-h-lvh overflow-hidden" ref={section04Ref}>
        <div className="container">
          <div
            className="flex h-lvh w-full origin-center flex-col justify-between p-10 text-[100px] font-bold"
            ref={title04Ref}
          >
            <h2 className="leading-none">
              <span className="text-primary block">BLACKPINK</span>
              <span className="block text-white">BLACKPINK IN YOUR AREA</span>
            </h2>
            <h2
              className="text-primary absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-0 text-center opacity-0"
              ref={text04Ref}
            >
              BLACKPINK
            </h2>
            <h2 className="text-right leading-none">
              <span className="text-primary block">BLACKPINK</span>
              <span className="block text-white">IS THE REVOLUTION</span>
            </h2>
          </div>
        </div>
      </section>
      <section className="relative h-lvh bg-white p-[10vw]" ref={section05Ref}>
        <div
          className="relative"
          style={{
            perspective: "1000px",
          }}
        >
          {albums.map((album, index) => {
            return (
              <div
                key={index}
                className={cn("absolute transition-all will-change-transform")}
                style={{
                  top: `calc((100vh - ${size} - 2 * 10vw) / ${count} * ${index})`,
                  left: `calc((100vw - ${size} - 2 * 10vw) / ${count} * ${index})`,
                  width: size,
                  height: size,
                  transformStyle: "preserve-3d",
                }}
                ref={(el) => {
                  el && (itemRefs.current[index] = el);
                }}
                onPointerDown={() => {
                  zoom(itemRefs.current[index]);
                }}
              >
                <div
                  className="absolute size-full"
                  style={{
                    transform: "rotate3d(-1,1,0,16deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span
                    className="absolute top-0 block h-[4vw] w-full bg-gray-600"
                    style={{
                      transform: `rotateX(90deg) translateZ(2vw)`,
                    }}
                  ></span>
                  <span
                    className="absolute bottom-0 block h-[4vw] w-full bg-gray-600"
                    style={{
                      transform: `rotateX(-90deg) translateZ(2vw)`,
                    }}
                  ></span>
                  <span
                    className="absolute left-0 block h-full w-[4vw] bg-gray-900"
                    style={{
                      transform: `rotateY(-90deg) translateZ(2vw)`,
                    }}
                  ></span>
                  <span
                    className="absolute right-0 block h-full w-[4vw] bg-gray-900"
                    style={{
                      transform: `rotateY(90deg) translateZ(2vw)`,
                    }}
                  ></span>
                  <span
                    className="absolute block size-full bg-black"
                    style={{
                      transform: `rotateY(180deg) translateZ(2vw)`,
                    }}
                  ></span>
                  <span
                    className="absolute block size-full bg-black"
                    style={{
                      transform: `rotateY(0deg) translateZ(2vw)`,
                    }}
                  >
                    <Image
                      src={`/assets/images/album/${album.image}`}
                      fill
                      className="object-cover"
                      alt=""
                      style={{ transform: `rotateY(0deg) translateZ(2vw)` }}
                    />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section
        className="relative h-lvh bg-gray-200"
        ref={section06Ref}
      ></section>
    </div>
  );
}

export default page;
