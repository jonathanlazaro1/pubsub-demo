FROM mcr.microsoft.com/dotnet/sdk:5.0-bullseye-slim AS build

# Install NodeJS 14.x (to build the React app)
RUN apt update -yq 
RUN apt install curl gnupg -yq 
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs

WORKDIR /app

COPY ./models ./models
COPY ./front_user ./front_user

WORKDIR /app/front_user
RUN dotnet restore --no-cache --force
RUN dotnet publish --no-restore -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet:5.0-bullseye-slim

WORKDIR /app
COPY --from=build /app/front_user/out ./

ENV AllowedHosts=*
ENV Logging__LogLevel__Default=Information
ENV Logging__LogLevel__Microsoft=Warning
ENV Logging__LogLevel__Microsoft.Hosting.Lifetime=Information

ENV ASPNETCORE_URLS=http://+:5001
EXPOSE 5001


ENTRYPOINT ["dotnet", "ReconBank.FrontUser.dll"]