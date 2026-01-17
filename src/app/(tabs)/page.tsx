import { Button, Divider, Footer, TagMain } from '@/components';
import { InstagramIcon, LinkIcon, YoutubeIcon } from '@/components/icons';

export default function Home() {
  return (
    <main className="flex flex-col gap-[40px]">
      <section className="flex w-full flex-col items-center gap-[39px]">
        <div className="relative aspect-[1125/1188] w-full overflow-hidden bg-[var(--color-gray-900)]">
          <div className="absolute inset-0 grid place-items-center px-[24px]">
            <p className="head_b_18 text-center text-[var(--color-gray-400)]">
              메인 이미지 (placeholder)
            </p>
          </div>
        </div>

        <div className="w-[343px]">
          <Button href="/products">서비스 보러가기</Button>
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-[48px]">
        <section className="flex w-full flex-col items-center gap-[40px]">
          <Divider />

          <section className="flex w-full flex-col items-center gap-[24px] px-[24px]">
            <div className="flex w-[286px] flex-col items-center gap-[6px]">
              <div className="flex h-[16px] w-[286px] items-center justify-center rounded-[2px] bg-[var(--color-gray-900)]">
                <p className="caption_r_10 text-[var(--color-gray-400)]">
                  로고 (placeholder)
                </p>
              </div>
              <p className="head_b_14 text-[var(--color-white)]">
                치열한 기록들로 띄워낸 가장 완벽한 아침
              </p>
            </div>

            <div className="body_r_14 w-full text-[var(--color-gray-200)]">
              <p className="mb-[10px]">
                국내 최대 규모 대학생연합 IT벤처창업 동아리 SOPT에서 데모데이
                &lt;System Update: SUNRISE&gt;를 개최합니다.
              </p>
              <p className="mb-[10px]">
                <br aria-hidden />
                SOPT는 2008년 창립 이후 IT 창업, 기획, 디자인, 개발에 관심 있는
                대학생들이 모여 함께 열정을 외치며, 지금까지 약 3,600명 이상의
                회원이 누적 300개 이상의 프로덕트를 만들어왔습니다.
              </p>
              <p className="mb-[10px]">
                <br aria-hidden />
                밤새워 써 내려간 수천 줄의 코드와 고민의 흔적들은 단순한 종이
                뭉치가 아닙니다. 그것은 우리를 더 높은 곳으로 띄우기 위한
                데이터이자, 가장 뜨거운 열정의 증명입니다.
              </p>
              <p className="mb-[10px]">
                <br aria-hidden />
                이번 데모데이에서는 ‘치열한 기록들로 띄워낸 가장 완벽한 아침’을
                주제로, 가장 깊은 몰입 끝에 마주한 37기만의 눈부신 결과물을
                선보입니다.
              </p>
              <p>
                <span className="head_b_14">
                  <br aria-hidden />
                  Now Loading Next DIVE... 99%
                </span>
                <span className="head_b_14">
                  <br aria-hidden />
                </span>
                로딩이 끝나는 순간 떠오를, 우리의 새로운 시스템 업데이트를 지금
                확인해 주세요.
              </p>
            </div>
          </section>

          <Divider />

          <section className="flex w-full flex-col gap-[56px]">
            <section className="flex w-full flex-col gap-[24px] px-[16px]">
              <TagMain>행사 개요</TagMain>
              <div className="flex items-end gap-[16px] px-[4px]">
                <div className="body_r_14 flex w-[40px] flex-col gap-[6px] text-[var(--color-gray-300)]">
                  <p>행사명</p>
                  <p>장소</p>
                  <p>일시</p>
                </div>
                <div className="body_r_14 flex flex-1 flex-col gap-[6px] text-[var(--color-white)]">
                  <p>SOPT 37기 앱잼 데모데이 : SUNRISE</p>
                  <p className="text-[var(--color-gray-100)]">마곡 NSP홀</p>
                  <p>2025.01.24(토) 10:30 ~ 17:00</p>
                </div>
              </div>
            </section>

            <section className="flex w-full flex-col gap-[24px] px-[16px]">
              <TagMain>DIVE SOPT APPJAM Demoday</TagMain>
              <p className="body_r_14 w-full text-[var(--color-gray-300)]">
                이번 앱잼 데모데이 &lt;System Update: SUNRISE&gt;에서는 SOPT의
                꽃 앱잼(APPJAM) 뿐만 아니라 SOPT를 위한 프로덕트를 만드는
                메이커스(SOPT Makers)의 결과물까지 함께 만나보실 수 있습니다.
              </p>
            </section>

            <section className="flex w-full flex-col gap-[24px] px-[16px]">
              <TagMain className="text-[var(--color-gray-100)]">
                Shout Our Passion Together
              </TagMain>
              <div className="body_r_14 w-full text-[var(--color-gray-300)]">
                <p className="mb-0">
                  SOPT는 국내 최대 규모의 대학생 연합 IT 벤처창업 동아리로,
                  2008년에 창립되어 18년째 대학생 창업 생태계 발전을 위해
                  노력하고 있습니다.
                </p>
                <p className="mb-0">&nbsp;</p>
                <p className="mb-0">
                  IT 창업 및 기획, 디자인, 개발에 관심 있는 대학생들이 모여 함께
                  열정을 외치며 지금까지 3,800명 이상의 회원이 400개가 넘는
                  프로덕트를 만들었습니다.
                </p>
                <p className="mb-0">&nbsp;</p>
                <p>
                  SOPT는 Shout Our Passion Together라는 이름 뜻처럼, 앞으로도
                  많은 사람들의 열정을 외치며 더욱 크게 도전하고자 합니다.
                </p>
              </div>
            </section>
          </section>

          <Divider />

          <section className="flex w-[343px] flex-col gap-[8px]">
            <section className="flex flex-col gap-[12px]">
              <p className="title_m_12 text-[var(--color-gray-200)]">
                Connect with SOPT
              </p>

              <div className="flex flex-col items-start">
                <div className="flex h-[20px] w-fit items-center gap-[4px] text-[var(--color-gray-400)]">
                  <YoutubeIcon width={20} height={20} />
                  <p className="title_m_12 opacity-80">soptmedia</p>
                </div>
                <div className="flex h-[20px] w-fit items-center gap-[4px] text-[var(--color-gray-400)]">
                  <InstagramIcon width={20} height={20} />
                  <p className="title_m_12 opacity-80">sopt_official</p>
                </div>
                <div className="flex h-[20px] w-fit items-center gap-[4px] text-[var(--color-gray-400)]">
                  <LinkIcon width={20} height={20} />
                  <p className="title_m_12 opacity-80">sopt.org</p>
                </div>
              </div>
            </section>

            <section className="flex w-full flex-col items-end justify-end gap-[12px]">
              <p className="title_m_12 text-[var(--color-gray-200)]">
                후원 및 협력
              </p>
              <div className="flex w-[176px] flex-wrap content-end items-end justify-end gap-[12px] mix-blend-luminosity">
                <div className="grid h-[14px] w-[50px] place-items-center rounded-[2px] bg-[var(--color-gray-900)]">
                  <p className="caption_r_10 text-[var(--color-gray-400)]">
                    로고
                  </p>
                </div>
                <div className="grid h-[20px] w-[50px] place-items-center rounded-[2px] bg-[var(--color-gray-900)]">
                  <p className="caption_r_10 text-[var(--color-gray-400)]">
                    로고
                  </p>
                </div>
                <div className="grid h-[24px] w-[50px] place-items-center rounded-[2px] bg-[var(--color-gray-900)] opacity-70">
                  <p className="caption_r_10 text-[var(--color-gray-400)]">
                    로고
                  </p>
                </div>
                <div className="grid h-[20px] w-[49px] place-items-center rounded-[2px] bg-[var(--color-gray-900)] opacity-70">
                  <p className="caption_r_10 text-[var(--color-gray-400)]">
                    로고
                  </p>
                </div>
                <div className="grid h-[15px] w-[50px] place-items-center rounded-[2px] bg-[var(--color-gray-900)]">
                  <p className="caption_r_10 text-[var(--color-gray-400)]">
                    로고
                  </p>
                </div>
                <div className="grid h-[18px] w-[50px] place-items-center rounded-[2px] bg-[var(--color-gray-900)]">
                  <p className="caption_r_10 text-[var(--color-gray-400)]">
                    로고
                  </p>
                </div>
              </div>
            </section>
          </section>
        </section>

        <Footer />
      </section>
    </main>
  );
}
