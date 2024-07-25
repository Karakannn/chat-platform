import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = process.env;

  app.setGlobalPrefix('api');

  try {
    await app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
