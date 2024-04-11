import { Text } from "@radix-ui/themes";
import styled from "styled-components";

const FooterContainer = styled.div`
  border-top: 4px solid teal;
  border-bottom: 4px solid teal;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgb(42, 244, 152, 255);
  z-index: 10;
  @media (min-width: 640px) {
    justify-content: space-around;
    gap: 10px;
  }
`;

const FooterSection = styled.div`
  text-align: start;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 5px;
  padding-top: 5px;

  @media (min-width: 640px) {
    gap: 5px;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding: 5px;
`;

export const Footer = () => {
  return (
    <div>
      <FooterContainer>
        <FooterSection>
          <div>
            <Text className="text-white text-extrabold">CityPortal</Text>
          </div>

          <SocialLinks></SocialLinks>
        </FooterSection>
        <FooterSection>
          <Text>КОНТАКТЫ</Text>
          <p>
            <a href="">Контакты</a>
          </p>
          <p>
            <a href="">Контакты</a>
          </p>
        </FooterSection>
        <FooterSection>
          <Text>НОВОСТИ</Text>
          <p>
            <a href="">Контакты</a>
          </p>
          <p>
            <a href="">Контакты</a>
          </p>
        </FooterSection>
        <FooterSection>
          <Text>ПРАВИЛА</Text>
          <p className="font-thin">
            <a href="">Контакты</a>
          </p>
          <p>
            <a href="">Контакты</a>
          </p>
        </FooterSection>
      </FooterContainer>
    </div>
  );
};
