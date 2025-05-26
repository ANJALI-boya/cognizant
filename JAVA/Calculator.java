public class Calculator {

    // A simple method to add two integers
    public int add(int a, int b) {
        int sum = a + b;
        return sum;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int x = 10;
        int y = 5;
        int result = calc.add(x, y); // Call the add method

        System.out.println("The sum is: " + result);
    }
}


