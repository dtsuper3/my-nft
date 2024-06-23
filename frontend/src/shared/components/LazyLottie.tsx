import { Flex, Skeleton } from '@mantine/core';
import { type LottieComponentProps } from 'lottie-react';
import { Suspense, lazy, useState, useEffect } from 'react';

const LazyLottieComponent: any = lazy(() => import('lottie-react'));

interface LottieProps<T extends Record<string, unknown>> {
  getAnimationData: () => Promise<T>;
  id: string;
}

export function LazyLottie<T extends Record<string, unknown>>({
  getAnimationData,
  id,
  ...props
}: LottieProps<T> & Omit<LottieComponentProps, 'animationData'>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // Trigger the library lazy load even if the animationData is not ready
        await import('lottie-react');
        const animationData = await getAnimationData();
        if (isMounted) {
          setData(animationData);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
          console.error('Failed to load animation data', error);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [getAnimationData]);

  if (loading) return <Flex justify={"center"} align={"center"}>
    <Skeleton height={props.height} width={props.width} />
  </Flex>

  return (
    <Suspense fallback={<Skeleton height={props.height} width={props.width} />}>
      <LazyLottieComponent animationData={data} {...props} />
    </Suspense>
  );
}
