# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Kopira samo glavnu projektu datoteku i izvršava dotnet restore
COPY PraksaBACK.csproj ./
RUN dotnet restore

# Kopira sve ostale datoteke i izvršava dotnet build
COPY . ./
RUN dotnet build -c Release -o out /app/PraksaBACK.csproj   # Promena ovde

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "PraksaBACK.dll"]
