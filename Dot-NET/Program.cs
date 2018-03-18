using System;

namespace Dot_NET
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Give me a 2 seed numbers, and I'll give you a Fibonacci-style sequence!");

            Console.Write("Seed one: ");
            int num1 = Int32.Parse( Console.ReadLine() );
            Console.Write("Seed two: ");
            int num2 = Int32.Parse( Console.ReadLine() );

            Console.WriteLine("Here's the first 20 numbers in your sequence: ");

            int num3;
            for (int i = 0; i < 20; i++)
            {
                num3 = num1 + num2;
                Console.WriteLine(num3);
                num1 = num2;
                num2 = num3;
            }

        }
    }
}
